"use client";

import { useState, useEffect } from "react";
import supabase from "@/services/supabase/config";
import WhatsAppActions from "./WhatsAppActions";

export default function SpreadsheetTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState(null);
  const [newRow, setNewRow] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    status: "new",
    notes: "",
  });

  const columns = [
    { key: "name", label: "Name", editable: true },
    { key: "email", label: "Email", editable: true },
    { key: "company", label: "Company", editable: true },
    { key: "phone", label: "Phone", editable: true },
    { key: "status", label: "Status", editable: true },
    { key: "notes", label: "Notes", editable: true },
    { key: "created_at", label: "Created", editable: false },
    { key: "whatsapp", label: "WhatsApp", editable: false },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: contacts, error } = await supabase
        .from("crm_contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData(contacts || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCellUpdate = async (rowId, field, value) => {
    try {
      const { error } = await supabase
        .from("crm_contacts")
        .update({ [field]: value })
        .eq("id", rowId);

      if (error) throw error;

      // Update local state
      setData((prevData) =>
        prevData.map((row) =>
          row.id === rowId ? { ...row, [field]: value } : row
        )
      );
    } catch (error) {
      console.error("Error updating cell:", error);
      alert("Failed to update cell: " + error.message);
    }
  };

  const handleAddRow = async () => {
    if (!newRow.name) {
      alert("Name is required");
      return;
    }

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("You must be logged in to add contacts");
        return;
      }

      const { data: insertedData, error } = await supabase
        .from("crm_contacts")
        .insert([{ ...newRow, user_id: user.id }])
        .select();

      if (error) throw error;

      setData([...insertedData, ...data]);
      setNewRow({
        name: "",
        email: "",
        company: "",
        phone: "",
        status: "new",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding row:", error);
      alert("Failed to add row: " + error.message);
    }
  };

  const handleDeleteRow = async (rowId) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const { error } = await supabase
        .from("crm_contacts")
        .delete()
        .eq("id", rowId);

      if (error) throw error;

      setData((prevData) => prevData.filter((row) => row.id !== rowId));
    } catch (error) {
      console.error("Error deleting row:", error);
      alert("Failed to delete row: " + error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {/* Add new row form */}
              <tr className="bg-gray-800/50">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newRow.name}
                    onChange={(e) =>
                      setNewRow({ ...newRow, name: e.target.value })
                    }
                    placeholder="Name"
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="email"
                    value={newRow.email}
                    onChange={(e) =>
                      setNewRow({ ...newRow, email: e.target.value })
                    }
                    placeholder="Email (optional)"
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newRow.company}
                    onChange={(e) =>
                      setNewRow({ ...newRow, company: e.target.value })
                    }
                    placeholder="Company"
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newRow.phone}
                    onChange={(e) =>
                      setNewRow({ ...newRow, phone: e.target.value })
                    }
                    placeholder="Phone"
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    value={newRow.status}
                    onChange={(e) =>
                      setNewRow({ ...newRow, status: e.target.value })
                    }
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newRow.notes}
                    onChange={(e) =>
                      setNewRow({ ...newRow, notes: e.target.value })
                    }
                    placeholder="Notes"
                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-400">-</td>
                <td className="px-4 py-2 text-sm text-gray-400">-</td>
                <td className="px-4 py-2">
                  <button
                    onClick={handleAddRow}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                  >
                    Add
                  </button>
                </td>
              </tr>

              {/* Existing data rows */}
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-800/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 text-sm text-white">
                      {col.editable ? (
                        editingCell === `${row.id}-${col.key}` ? (
                          col.key === "status" ? (
                            <select
                              defaultValue={row[col.key]}
                              onBlur={(e) => {
                                handleCellUpdate(
                                  row.id,
                                  col.key,
                                  e.target.value
                                );
                                setEditingCell(null);
                              }}
                              autoFocus
                              className="w-full px-2 py-1 bg-gray-700 border border-blue-500 rounded text-white focus:outline-none"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="proposal">Proposal</option>
                              <option value="won">Won</option>
                              <option value="lost">Lost</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              defaultValue={row[col.key]}
                              onBlur={(e) => {
                                handleCellUpdate(
                                  row.id,
                                  col.key,
                                  e.target.value
                                );
                                setEditingCell(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleCellUpdate(
                                    row.id,
                                    col.key,
                                    e.target.value
                                  );
                                  setEditingCell(null);
                                }
                              }}
                              autoFocus
                              className="w-full px-2 py-1 bg-gray-700 border border-blue-500 rounded text-white focus:outline-none"
                            />
                          )
                        ) : (
                          <div
                            onClick={() =>
                              setEditingCell(`${row.id}-${col.key}`)
                            }
                            className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded min-h-[28px]"
                          >
                            {row[col.key] || "-"}
                          </div>
                        )
                      ) : col.key === "created_at" ? (
                        formatDate(row[col.key])
                      ) : col.key === "whatsapp" ? (
                        <WhatsAppActions contact={row} onRefresh={fetchData} />
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No contacts yet. Add your first contact above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
