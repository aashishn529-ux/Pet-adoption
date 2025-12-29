import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      setMessage("Welcome! Your account is ready 🐾");
      setIsError(false);

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setIsError(true);
      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered 🐕");
      } else if (error.code === "auth/weak-password") {
        setMessage("Password should be at least 6 characters 🐶");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    }
  };

  return (
    <>
      {/* ✨ MICRO ANIMATIONS */}
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.96) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account 🐶</h2>

          <p style={styles.helper}>
            Join us and help a pet find a loving home 💚
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {message && (
              <p
                style={{
                  ...styles.message,
                  color: isError ? "#C62828" : "#2E7D32",
                }}
              >
                {message}
              </p>
            )}

            <button style={styles.button} type="submit">
              Sign Up
            </button>
          </form>

          <p style={styles.text}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

/* 🎨 SAME THEME, MORE WARMTH */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFDF7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "360px",
    background: "#fff",
    padding: "34px",
    borderRadius: "20px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.1)",
    textAlign: "center",
    animation: "popIn 0.6s ease",
  },

  title: {
    marginBottom: "8px",
    color: "#2E7D32",
    fontSize: "24px",
    fontWeight: "700",
  },

  helper: {
    fontSize: "14px",
    color: "#6f7f6a",
    marginBottom: "22px",
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
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  },

  message: {
    fontSize: "13px",
    marginTop: "4px",
  },

  button: {
    marginTop: "10px",
    padding: "13px",
    borderRadius: "30px",
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },

  text: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#555",
  },

  link: {
    color: "#6A1B9A",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
