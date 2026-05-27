
'use client';

import { useEffect, useState } from "react";
import { Contact } from "../types/Contact";

interface Props {
  onSubmit: (data: Contact) => void;
  selected?: Contact | null;
  onClose: () => void;
}

export default function ContactForm({
  onSubmit,
  selected,
  onClose,
}: Props) {

  const [form, setForm] = useState<Contact>({
    full_name: "",
    email: "",
    mobile: "",
    company_name: "",
    job_title: "",
    city: "",
    status: "active",
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    }
  }, [selected]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="glass-modal">

        <h2>
          {selected ? "Edit Contact" : "Add Contact"}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "20px",
          }}
        >

          <input
            className="neu-input"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
          />

          <input
            className="neu-input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="neu-input"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
          />

          <input
            className="neu-input"
            name="company_name"
            placeholder="Company Name"
            value={form.company_name}
            onChange={handleChange}
          />

          <input
            className="neu-input"
            name="job_title"
            placeholder="Job Title"
            value={form.job_title}
            onChange={handleChange}
          />

          <input
            className="neu-input"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <select
            className="neu-input"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              className="neu-button"
              onClick={() => onSubmit(form)}
            >
              Save
            </button>

            <button
              className="neu-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}