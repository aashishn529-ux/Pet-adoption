import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

/* ✅ STABLE UNSPLASH IMAGES (NO FAILS) */
const dogImages = [
  "https://images.unsplash.com/photo-1558788353-f76d92427f16",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b6",
  "https://images.unsplash.com/photo-1601758123927-1964b0b6f8c4",
];

const catImages = [
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  "https://images.unsplash.com/photo-1595433562696-19fdbb1b7fbc",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  "https://images.unsplash.com/photo-1606225457115-9b0e4c7b4f31",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
];

function getPetImage(type, id) {
  const list = type === "Cat" ? catImages : dogImages;
  return list[id % list.length];
}

function getPetName(type, id) {
  const dogNames = ["Bruno", "Rocky", "Buddy", "Max", "Charlie", "Leo"];
  const catNames = ["Luna", "Milo", "Bella", "Kitty", "Simba", "Nala"];
  const list = type === "Dog" ? dogNames : catNames;
  return list[id % list.length];
}

function monthsToYears(months) {
  return `${Math.floor(months / 12)} years`;
}

export default function Pets() {
  const [pets, setPets] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <style>{`
        /* 🌿 SMOOTH ENTRY */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* 🌬️ SOFT FLOAT */
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div style={styles.page}>
        <div style={{ ...styles.paw, top: "20%", left: "5%" }}>🐾</div>
        <div style={{ ...styles.paw, bottom: "15%", right: "6%" }}>🐾</div>
        <div style={{ ...styles.paw, top: "35%", right: "20%" }}>🐾</div>

        <h1 style={styles.heading}>Available Pets 🐶🐱</h1>

        <div style={styles.grid}>
          {pets.map((pet, index) => (
            <div
              key={pet.PetID}
              style={{
                ...styles.card,
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div style={styles.imageWrap}>
                <img
                  src={getPetImage(pet.PetType, pet.PetID)}
                  alt="Pet"
                  style={styles.image}
                />
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.petName}>
                  {getPetName(pet.PetType, pet.PetID)}
                </h3>

                <p style={styles.meta}>Breed: {pet.Breed}</p>
                <p style={styles.meta}>
                  Age: {monthsToYears(pet.AgeMonths)}
                </p>

                <button
                  onClick={() =>
                    !user
                      ? navigate("/signup")
                      : navigate(`/pets/${pet.PetID}`)
                  }
                  style={styles.detailsLink}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* 🎨 SAME DESIGN — SMOOTHER MOTION */
const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    background: "linear-gradient(135deg, #fdf6ec, #eef7e8)",
    padding: "60px 40px",
    position: "relative",
    overflow: "hidden",
  },
  heading: {
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "800",
    color: "#1f4d2b",
    marginBottom: "50px",
    animation: "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "40px",
    maxWidth: "1300px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
    animation: "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
    transition: "transform 0.45s ease, box-shadow 0.45s ease",
    willChange: "transform",
  },
  imageWrap: { overflow: "hidden" },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    transition: "transform 0.6s ease",
  },
  cardBody: { padding: "20px" },
  petName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f4d2b",
    marginBottom: "6px",
  },
  meta: {
    fontSize: "14px",
    color: "#5f6f52",
    marginBottom: "4px",
  },
  detailsLink: {
    display: "inline-block",
    marginTop: "12px",
    color: "#2f8f46",
    fontWeight: "600",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.25s ease",
  },
  paw: {
    position: "absolute",
    fontSize: "34px",
    opacity: 0.15,
    animation: "float 7s ease-in-out infinite",
  },
};
