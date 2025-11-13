"use client";

import { useState, useEffect } from "react";
import {
  sendWhatsAppMessage,
  sendWhatsAppTemplate,
  WHATSAPP_TEMPLATES,
  isValidWhatsAppNumber,
  formatPhoneNumber,
} from "@/services/whatsapp/whatsappService";
import supabase from "@/services/supabase/config";

export default function WhatsAppModal({ contact, onClose, onSuccess }) {
  const [selectedTemplate, setSelectedTemplate] = useState("hello_world");
  const [message, setMessage] = useState("");
  const [variables, setVariables] = useState({});
  const [loading, setLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);

  const currentTemplate = WHATSAPP_TEMPLATES.find(
    (t) => t.id === selectedTemplate
  );

  // Check if current template is an approved WhatsApp template
  const isApprovedTemplate = currentTemplate?.isApprovedTemplate || false;

  // Initialize variables with default values
  useEffect(() => {
    if (currentTemplate) {
      const defaultVars = {};
      currentTemplate.variables.forEach((varName) => {
        if (varName === "name") {
          defaultVars[varName] = contact.name || "";
        } else if (varName === "sender_name") {
          defaultVars[varName] = "Carlos"; // You can make this dynamic
        } else {
          defaultVars[varName] = "";
        }
      });
      setVariables(defaultVars);

      // Set initial message
      if (selectedTemplate === "custom") {
        setMessage("");
      } else {
        setMessage(currentTemplate.message);
      }
    }
  }, [selectedTemplate, contact.name, currentTemplate]);

  // Update message preview when variables change
  useEffect(() => {
    if (currentTemplate && selectedTemplate !== "custom") {
      let updatedMessage = currentTemplate.message;
      Object.keys(variables).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        updatedMessage = updatedMessage.replace(
          regex,
          variables[key] || `{{${key}}}`
        );
      });
      setMessage(updatedMessage);
    }
  }, [variables, currentTemplate, selectedTemplate]);

  const handleSendNow = async () => {
    if (!isValidWhatsAppNumber(contact.phone)) {
      alert("Invalid phone number. Please update the contact's phone number.");
      return;
    }

    setLoading(true);
    try {
      let result;

      if (isApprovedTemplate) {
        // Send approved WhatsApp Business template (exact match to curl)
        result = await sendWhatsAppTemplate(
          contact.phone,
          currentTemplate.templateName,
          currentTemplate.languageCode
        );
      } else {
        // Send text message
        if (!message.trim()) {
          alert("Please enter a message.");
          setLoading(false);
          return;
        }
        result = await sendWhatsAppMessage(contact.phone, message);
      }

      if (result.success) {
        // Log the message in the database
        const messageText = isApprovedTemplate
          ? `Template: ${currentTemplate.templateName}`
          : message;
        await logWhatsAppMessage(contact.id, messageText, "sent");

        alert("Message sent successfully!");
        onSuccess && onSuccess();
        onClose();
      } else {
        alert(`Failed to send message: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        "Failed to send message. Please check your WhatsApp API configuration."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!scheduledDate || !scheduledTime) {
      alert("Please select both date and time for scheduling.");
      return;
    }

    if (!isValidWhatsAppNumber(contact.phone)) {
      alert("Invalid phone number. Please update the contact's phone number.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    if (scheduledDateTime <= new Date()) {
      alert("Scheduled time must be in the future.");
      return;
    }

    setLoading(true);
    try {
      // Save scheduled message to database
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("whatsapp_scheduled_messages")
        .insert([
          {
            contact_id: contact.id,
            user_id: user.id,
            phone_number: contact.phone,
            message: message,
            template_id: selectedTemplate,
            scheduled_for: scheduledDateTime.toISOString(),
            status: "pending",
          },
        ]);

      if (error) throw error;

      alert(`Message scheduled for ${scheduledDateTime.toLocaleString()}!`);
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      console.error("Error scheduling message:", error);
      alert("Failed to schedule message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logWhatsAppMessage = async (contactId, messageText, status) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await supabase.from("whatsapp_messages").insert([
        {
          contact_id: contactId,
          user_id: user.id,
          message: messageText,
          status: status,
          sent_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error logging message:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Send WhatsApp Message
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              To: {contact.name} - {formatPhoneNumber(contact.phone)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {WHATSAPP_TEMPLATES.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                  {template.isApprovedTemplate ? " ✓" : ""}
                </option>
              ))}
            </select>
            {isApprovedTemplate && (
              <p className="text-xs text-blue-400 mt-2">
                ✓ This is a WhatsApp approved template - works with test
                accounts
              </p>
            )}
          </div>

          {/* Approved Template Info */}
          {isApprovedTemplate && (
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h3 className="text-blue-400 font-medium mb-2">
                📋 Using Approved Template: {currentTemplate.templateName}
              </h3>
              <p className="text-gray-300 text-sm mb-2">
                This will send the pre-approved template message:
              </p>
              <div className="bg-gray-900 rounded p-3 text-sm text-gray-400 italic">
                "{currentTemplate.message}"
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Language: {currentTemplate.languageCode} • Works with test
                accounts
              </p>
            </div>
          )}

          {/* Variables Input - Only show for non-approved templates */}
          {!isApprovedTemplate &&
            currentTemplate?.variables.length > 0 &&
            selectedTemplate !== "custom" && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Template Variables
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentTemplate.variables.map((varName) => (
                    <div key={varName}>
                      <label className="block text-xs text-gray-400 mb-1 capitalize">
                        {varName.replace(/_/g, " ")}
                      </label>
                      <input
                        type="text"
                        value={variables[varName] || ""}
                        onChange={(e) =>
                          setVariables({
                            ...variables,
                            [varName]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${varName.replace(/_/g, " ")}`}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Message Preview - Only show for non-approved templates */}
          {!isApprovedTemplate && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {selectedTemplate === "custom"
                  ? "Your Message"
                  : "Message Preview"}
              </label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  readOnly={selectedTemplate !== "custom"}
                  rows={8}
                  className={`w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    selectedTemplate !== "custom" ? "cursor-default" : ""
                  }`}
                  placeholder={
                    selectedTemplate === "custom"
                      ? "Type your custom message here..."
                      : "Message preview will appear here"
                  }
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {message.length} characters
                </div>
              </div>
            </div>
          )}

          {/* Schedule Section */}
          <div className="border-t border-gray-700 pt-4">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium mb-3"
            >
              <svg
                className={`w-4 h-4 mr-2 transition-transform ${
                  showSchedule ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Schedule for later
            </button>

            {showSchedule && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          {showSchedule ? (
            <button
              onClick={handleSchedule}
              disabled={loading || !scheduledDate || !scheduledTime}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Schedule Message
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleSendNow}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send Now
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
