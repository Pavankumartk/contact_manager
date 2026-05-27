
'use client';

import { useEffect, useState } from "react";
import { Contact } from "../types/Contact";
import { 
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from "../api/contactsApi";
import ThemeToggle from "./ThemeToggle";
import ContactForm from "./ContactForm";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      const res = await getContacts(search);
      setContacts(res.data);
    } catch {
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search]);

  // Add / Update Contact
  const handleSubmit = async (data: Contact) => {
    try {
      if (selected?.id) {
        await updateContact(selected.id, data);
        toast.success("Contact updated successfully");
      } else {
        await createContact(data);
        toast.success("Contact added successfully");
      }

      setShowForm(false);
      setSelected(null);
      fetchContacts();

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  // Delete Contact with Confirmation
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {
      await deleteContact(id);
      toast.success("Contact deleted");
      fetchContacts();
    } catch {
      toast.error("Delete failed");
    }
  };
  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, [darkMode]);
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "30px",
      }}
    >
      {/* Header */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
    
        <h1>📇 Contact Manager</h1>

        <button
          className="neu-button"
          onClick={() => {
            setSelected(null);
            setShowForm(true);
          }}
        >
          + Add Contact
        </button>
            <ThemeToggle
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
      </div> */}

{/* Header */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    width: "100%",
  }}
>
  {/* Left Side */}
  <h1
    style={{
      fontSize: "42px",
      fontWeight: "bold",
      margin: 0,
    }}
  >
     Contact Manager
  </h1>

  {/* Right Side Buttons */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
    }}
  >
    {/* Add Contact Button */}
    <button
      className="neu-button"
      onClick={() => {
        setSelected(null);
        setShowForm(true);
      }}
      style={{
        minWidth: "160px",
        height: "50px",
        fontSize: "16px",
      }}
    >
      + Add Contact
    </button>

    {/* Theme Toggle */}
    <button
  className="neu-button"
  onClick={() => setDarkMode(!darkMode)}
  style={{
    minWidth: "160px",
    height: "50px",
    fontSize: "16px",
  }}
>
  {darkMode
    ? "☀ Light Mode"
    : "🌙 Dark Mode"}
</button>
  </div>
</div>
      {/* Search */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Form Modal */}
      {showForm && (
        <ContactForm
          onSubmit={handleSubmit}
          selected={selected}
          onClose={() => {
            setShowForm(false);
            setSelected(null);
          }}
        />
      )}

      {/* Empty State */}
      {contacts.length === 0 && (
        <div className="neu-card">
          <h3>No contacts found</h3>
        </div>
      )}

      {/* Contact List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {contacts.map((c) => (
          <div
            key={c.id}
            className="neu-card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {/* Left Side Details */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "15px",
                flex: 1,
              }}
            >
              <div>
                <strong>Full Name</strong>
                <p>{c.full_name}</p>
              </div>

              <div>
                <strong>Email</strong>
                <p>{c.email}</p>
              </div>

              <div>
                <strong>Mobile</strong>
                <p>{c.mobile}</p>
              </div>

              <div>
                <strong>Company</strong>
                <p>{c.company_name || "-"}</p>
              </div>

              <div>
                <strong>Job Title</strong>
                <p>{c.job_title || "-"}</p>
              </div>

              <div>
                <strong>City</strong>
                <p>{c.city || "-"}</p>
              </div>

              <div>
                <strong>Status</strong>
                <p>{c.status || "active"}</p>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <button
                className="neu-button"
                onClick={() => {
                  setSelected(c);
                  setShowForm(true);
                }}
              >
                ✏️ Edit
              </button>

              <button
                className="neu-button"
                onClick={() => handleDelete(c.id!)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}