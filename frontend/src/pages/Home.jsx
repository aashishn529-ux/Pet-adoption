import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* SAFE GLOBAL CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div style={styles.page}>
        {/* floating paws */}
        <div style={{ ...styles.paw, ...styles.paw1 }}>🐾</div>
        <div style={{ ...styles.paw, ...styles.paw2 }}>🐾</div>
        <div style={{ ...styles.paw, ...styles.paw3 }}>🐾</div>

        <div style={styles.hero}>
          <h1 style={styles.title}>
            Find Your Forever Friend 🐶
          </h1>

          <p style={styles.subtitle}>
            Adopt. Love. Repeat ❤️
          </p>

          <div style={styles.btnGroup}>
            <Link to="/pets">
              <button style={styles.primaryBtn}>View Pets</button>
            </Link>

            <Link to="/signup">
              <button style={styles.secondaryBtn}>Join Us</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "linear-gradient(135deg, #fdf6ec, #eef7e8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },

  hero: {
    background: "linear-gradient(135deg, #ecf8ec, #f6fbe9)",
    width: "100%",
    maxWidth: "1200px",
    borderRadius: "45px",
    padding: "110px 30px",
    textAlign: "center",
    boxShadow: "0 30px 70px rgba(0,0,0,0.15)",
    animation: "fadeIn 1s ease",
  },

  title: {
    fontSize: "50px",
    color: "#1f4d2b",
    fontWeight: "800",
    marginBottom: "12px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#4f6f52",
    marginBottom: "40px",
  },

  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#2f8f46",
    color: "#fff",
    border: "none",
    padding: "15px 40px",
    fontSize: "16px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryBtn: {
    background: "transparent",
    color: "#2f8f46",
    border: "2px solid #2f8f46",
    padding: "15px 40px",
    fontSize: "16px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "600",
  },

  paw: {
    position: "absolute",
    fontSize: "34px",
    opacity: 0.15,
    animation: "float 6s infinite ease-in-out",
  },

  paw1: { top: "20%", left: "10%" },
  paw2: { bottom: "15%", right: "12%" },
  paw3: { top: "35%", right: "25%" },
};
