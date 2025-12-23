import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Apply() {
  const { id } = useParams(); // pet id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 Basic validation
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.reason
    ) {
      alert("Please fill all fields 🐾");
      return;
    }

    // 🧠 FOR NOW: simulate successful submit
    console.log("Adoption Application Submitted:", {
      petId: id,
      ...form,
    });

    alert("💚 Application submitted successfully!");

    // redirect to home or pets page
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Adoption Application 🐾
        </h2>

        <p style={styles.petId}>
          Pet ID: <strong>{id}</strong>
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <textarea
            style={styles.textarea}
            name="reason"
            placeholder="Why do you want to adopt this pet?"
            value={form.reason}
            onChange={handleChange}
          />

          <button type="submit" style={styles.button}>
            Submit Application 💚
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFDF7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 10px",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    padding: "32px",
    borderRadius: "22px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    color: "#2E7D32",
    marginBottom: "8px",
  },
  petId: {
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "22px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
    minHeight: "100px",
    resize: "none",
  },
  button: {
    marginTop: "12px",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
