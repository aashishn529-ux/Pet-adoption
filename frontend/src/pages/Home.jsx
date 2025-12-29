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

        @keyframes petFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div style={styles.page}>
        {/* floating paws */}
        <div style={{ ...styles.paw, ...styles.paw1 }}>🐾</div>
        <div style={{ ...styles.paw, ...styles.paw2 }}>🐾</div>
        <div style={{ ...styles.paw, ...styles.paw3 }}>🐾</div>

        {/* HERO */}
        <div style={styles.hero}>
          <h1 style={styles.title}>
            Find Your Forever Friend 🐶
          </h1>

          <p style={styles.subtitle}>
            Adopt. Love. Repeat ❤️
          </p>

          {/* 🐕 FIXED HERO IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=60"
            alt="Cute dog"
            style={styles.heroPet}
            loading="lazy"
          />

          <div style={styles.btnGroup}>
            <Link to="/pets">
              <button style={styles.primaryBtn}>View Pets</button>
            </Link>

            <Link to="/signup">
              <button style={styles.secondaryBtn}>Join Us</button>
            </Link>
          </div>
        </div>

        {/* INFO SECTION */}
        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <span style={styles.icon}>🔍</span>
            <h4 style={styles.infoTitle}>Search Pet</h4>
            <p style={styles.infoText}>
              Find dogs & cats looking for a loving home near you.
            </p>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.icon}>📞</span>
            <h4 style={styles.infoTitle}>Connect</h4>
            <p style={styles.infoText}>
              Contact shelters or owners and learn about your pet.
            </p>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.icon}>❤️</span>
            <h4 style={styles.infoTitle}>Adopt Love</h4>
            <p style={styles.infoText}>
              Complete adoption and welcome your forever friend.
            </p>
          </div>
        </div>

        {/* 🧡 CUSTOMER REVIEW SECTION */}
        <div style={styles.reviewSection}>
          <div style={styles.reviewCard}>
            <img
              src="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=300&q=60"
              alt="Happy adopter"
              style={styles.reviewImage}
              loading="lazy"
            />

            <p style={styles.reviewText}>
              “Adopting from Pet Adoption was the best decision ever.
              Bruno has completely changed our lives ❤️”
            </p>

            <p style={styles.reviewName}>
              — Aashish, Bangalore 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* 🎨 STYLES (THEME UNCHANGED) */
const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "linear-gradient(135deg, #fdf6ec, #eef7e8)",
    padding: "40px 20px 90px",
    position: "relative",
    overflow: "hidden",
  },

  hero: {
    background: "linear-gradient(135deg, #ecf8ec, #f6fbe9)",
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "45px",
    padding: "100px 30px",
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
    marginBottom: "20px",
  },

  heroPet: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "10px auto 35px",
    display: "block",
    animation: "petFloat 4s ease-in-out infinite",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
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

  infoSection: {
    marginTop: "70px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  infoCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "30px 22px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    animation: "fadeIn 1.2s ease",
  },

  icon: {
    fontSize: "34px",
    marginBottom: "10px",
    display: "block",
  },

  infoTitle: {
    color: "#1f4d2b",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  infoText: {
    fontSize: "14px",
    color: "#5f6f52",
    lineHeight: 1.6,
  },

  reviewSection: {
    marginTop: "80px",
    display: "flex",
    justifyContent: "center",
  },

  reviewCard: {
    background: "#fff",
    borderRadius: "30px",
    padding: "40px 30px",
    maxWidth: "520px",
    textAlign: "center",
    boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
    animation: "fadeIn 1.4s ease",
  },

  reviewImage: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
  },

  reviewText: {
    fontSize: "16px",
    color: "#4f6f52",
    marginBottom: "12px",
    lineHeight: 1.6,
  },

  reviewName: {
    fontSize: "14px",
    color: "#2f8f46",
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
