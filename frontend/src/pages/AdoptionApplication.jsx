import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdoptionApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 📧 SIMULATED EMAIL CONTENT
    const emailPayload = {
      petId: id,
      name,
      email,
      phone,
      address,
      reason,
      paymentInfo: `
Contact: adoption@petcare.org
Phone: +91 98765 43210
UPI: petcare@upi
Bank: SBI
Account No: 1234567890
IFSC: SBIN0000123
      `,
    };

    // 📨 "SEND EMAIL" (SIMULATION)
    console.log("📧 Adoption Email Sent:", emailPayload);

    setMessage(
      "Application submitted! An email has been sent with payment and contact details 💚"
    );

    // ⏳ allow user to read message
    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Adoption Application 🐾
        </h2>

        <p style={{ marginBottom: "15px", color: "#555" }}>
          Pet ID: {id}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Why do you want to adopt this pet?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          {message && (
            <p style={{ color: "#2E7D32", fontSize: "14px" }}>
              {message}
            </p>
          )}

          <button style={styles.button} type="submit">
            Submit Application 💚
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🎨 STYLES (UNCHANGED) */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFDF7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "420px",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    color: "#2E7D32",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    minHeight: "90px",
    resize: "none",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
