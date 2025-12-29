import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function AdminSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const getLinkStyle = ({ isActive }) => ({
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    padding: "10px 14px",
    borderRadius: "10px",
    background: isActive ? "#1b5e20" : "transparent",
    transition: "0.25s ease",
  });

  return (
    <div style={styles.sidebar}>
      <div>
        <h2 style={styles.logo}>Admin 🐾</h2>

        <nav style={styles.nav}>
          <NavLink to="/admin" end style={getLinkStyle}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/pets" style={getLinkStyle}>
            🐶 Manage Pets
          </NavLink>

          <NavLink to="/admin/requests" style={getLinkStyle}>
            📩 Adoption Requests
          </NavLink>
        </nav>
      </div>

      <button
        style={styles.logout}
        onClick={() => {
          const confirmLogout = window.confirm("Logout from admin?");
          if (confirmLogout) {
            logout();
            navigate("/");
          }
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "#2f8f46",
    color: "#fff",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
  },
  logo: {
    marginBottom: "40px",
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  logout: {
    background: "#fff",
    color: "#2f8f46",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    transition: "0.2s ease",
  },
};
