// WhatsApp Business API Service

const WHATSAPP_API_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_API_URL ||
  "https://graph.facebook.com/v22.0";
const WHATSAPP_PHONE_NUMBER_ID =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN;

/**
 * Send a WhatsApp message to a contact
 * @param {string} to - Recipient phone number (with country code, no + or -)
 * @param {string} message - Message text
 * @returns {Promise<Object>} Response from WhatsApp API
 */
export async function sendWhatsAppMessage(to, message) {
  try {
    // Remove any non-digit characters from phone number
    const cleanPhoneNumber = to.replace(/\D/g, "");

    const response = await fetch(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanPhoneNumber,
          type: "text",
          text: {
            preview_url: true,
            body: message,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    return {
      success: true,
      messageId: data.messages?.[0]?.id,
      data,
    };
  } catch (error) {
    console.error("WhatsApp send error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send a template message via WhatsApp
 * @param {string} to - Recipient phone number
 * @param {string} templateName - Template name registered in WhatsApp Business
 * @param {string} languageCode - Language code (e.g., 'en', 'en_US')
 * @param {Array} components - Template components (optional)
 * @returns {Promise<Object>} Response from WhatsApp API
 */
export async function sendWhatsAppTemplate(
  to,
  templateName,
  languageCode = "en",
  components = []
) {
  try {
    const cleanPhoneNumber = to.replace(/\D/g, "");

    const response = await fetch(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanPhoneNumber,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: languageCode,
            },
            components,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message || "Failed to send WhatsApp template"
      );
    }

    return {
      success: true,
      messageId: data.messages?.[0]?.id,
      data,
    };
  } catch (error) {
    console.error("WhatsApp template send error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Validate phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
export function isValidWhatsAppNumber(phoneNumber) {
  if (!phoneNumber) return false;
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  // WhatsApp numbers should be 10-15 digits
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
}

/**
 * Format phone number for display
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} Formatted phone number
 */
export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return "";
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  if (cleanNumber.length === 10) {
    // US format: (XXX) XXX-XXXX
    return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(
      3,
      6
    )}-${cleanNumber.slice(6)}`;
  } else if (cleanNumber.length === 11 && cleanNumber.startsWith("1")) {
    // US with country code: +1 (XXX) XXX-XXXX
    return `+1 (${cleanNumber.slice(1, 4)}) ${cleanNumber.slice(
      4,
      7
    )}-${cleanNumber.slice(7)}`;
  }

  // International format
  return `+${cleanNumber}`;
}

// Common follow-up templates
export const WHATSAPP_TEMPLATES = [
  {
    id: "hello_world",
    name: "Test Template (hello_world)",
    message: "Hello World",
    variables: [],
    isApprovedTemplate: true,
    templateName: "hello_world",
    languageCode: "en_US",
  },
  {
    id: "initial_contact",
    name: "Initial Contact",
    message: `Hi {{name}},

Thank you for your interest! I'd love to discuss how we can help you with {{service}}.

When would be a good time for a quick call?

Best regards,
{{sender_name}}`,
    variables: ["name", "service", "sender_name"],
  },
  {
    id: "follow_up_1",
    name: "First Follow-up",
    message: `Hi {{name}},

Just following up on my previous message. I wanted to see if you had a chance to review our proposal.

Is there anything I can clarify or any questions I can answer?

Looking forward to hearing from you!

Best,
{{sender_name}}`,
    variables: ["name", "sender_name"],
  },
  {
    id: "follow_up_2",
    name: "Second Follow-up",
    message: `Hi {{name}},

I hope this message finds you well. I wanted to check in one more time regarding {{topic}}.

If the timing isn't right, no worries at all. Feel free to reach out whenever you're ready.

Best regards,
{{sender_name}}`,
    variables: ["name", "topic", "sender_name"],
  },
  {
    id: "meeting_confirmation",
    name: "Meeting Confirmation",
    message: `Hi {{name}},

This is a friendly reminder about our meeting scheduled for {{date}} at {{time}}.

Meeting link: {{meeting_link}}

Looking forward to speaking with you!

Best,
{{sender_name}}`,
    variables: ["name", "date", "time", "meeting_link", "sender_name"],
  },
  {
    id: "proposal_sent",
    name: "Proposal Sent",
    message: `Hi {{name}},

I've just sent over the proposal we discussed. Please review it at your convenience.

Key highlights:
• {{highlight_1}}
• {{highlight_2}}
• {{highlight_3}}

Let me know if you have any questions!

Best,
{{sender_name}}`,
    variables: [
      "name",
      "highlight_1",
      "highlight_2",
      "highlight_3",
      "sender_name",
    ],
  },
  {
    id: "thank_you",
    name: "Thank You",
    message: `Hi {{name}},

Thank you for taking the time to meet with me today! I really enjoyed our conversation about {{topic}}.

As discussed, I'll {{next_step}}.

Feel free to reach out if you have any questions in the meantime.

Best regards,
{{sender_name}}`,
    variables: ["name", "topic", "next_step", "sender_name"],
  },
  {
    id: "custom",
    name: "Custom Message",
    message: "",
    variables: [],
  },
];
