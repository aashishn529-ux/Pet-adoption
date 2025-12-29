import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      // 🔐 Firebase login
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ success → go home
      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 🐾</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p style={{ color: "#d32f2f", fontSize: "13px" }}>
              {error}
            </p>
          )}

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <p style={styles.text}>
          New here?{" "}
          <Link to="/signup" style={styles.link}>
            Create account
          </Link>
        </p>
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
    width: "360px",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
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
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#6A1B9A",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
