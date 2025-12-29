import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

import { db } from "../firebase";
import AuthContext from "../context/AuthContext";

export default function AdoptionApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  // ⛔ Safety guard (prevents crash if user not loaded)
  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Please login to apply for adoption.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting adoption application...");

      // 1️⃣ Store application in Firestore
      await addDoc(collection(db, "adoptionApplications"), {
        petId: id,
        userId: user.uid,
        name: user.name,
        email: user.email,
        phone,
        address,
        reason,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      console.log("Firestore saved");

      // 2️⃣ Send confirmation email via EmailJS
      const result = await emailjs.send(
        "service_8uu3vaq",          // ✅ Service ID
        "template_ab12cd",          // ✅ Template ID
        {
          to_name: user.name,
          to_email: user.email,
          pet_id: id,
        },
        "osqBEKWyXqHvK8LD8"          // 🔑 YOUR PUBLIC KEY
      );

      console.log("EmailJS result:", result);

      setMessage(
        "Application submitted! Check your email for confirmation 💚"
      );

      setTimeout(() => navigate("/"), 1800);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Adoption Application 🐾</h2>

        <p style={{ marginBottom: "15px", color: "#555" }}>
          Pet ID: {id}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} value={user.name} disabled />
          <input style={styles.input} value={user.email} disabled />

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
