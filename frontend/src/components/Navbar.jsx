import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

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
      {/* 🐾 LOGO */}
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

      {/* 🔗 NAV LINKS */}
      <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/pets" style={{ textDecoration: "none" }}>
          Pets
        </Link>

        {/* 🔐 ADMIN LINK (THIS WAS MISSING) */}
        {user?.isAdmin && (
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              color: "#2e7d32",
              fontWeight: 600,
            }}
          >
            Admin
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>

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
          </>
        ) : (
          <>
            <span style={{ color: "#2e7d32", fontWeight: 600 }}>
              Hi, {user.name}
            </span>

            <button
              onClick={logout}
              style={{
                padding: "8px 20px",
                backgroundColor: "#d32f2f",
                color: "#fff",
                borderRadius: 25,
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
