import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 50px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          fontSize: 24,
          fontWeight: 700,
          color: "#2e7d32",
        }}
      >
        🐾 Pet Adoption
      </Link>

      <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>Home</Link>
        <Link to="/pets" style={{ textDecoration: "none" }}>Pets</Link>
        <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
        <Link
          to="/signup"
          style={{
            padding: "8px 20px",
            backgroundColor: "#2e7d32",
            color: "#fff",
            borderRadius: 25,
            textDecoration: "none",
          }}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
