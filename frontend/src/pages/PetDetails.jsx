import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

/* ✅ STABLE UNSPLASH IMAGES (NO FAILS EVER) */
const dogImages = [
  "https://images.unsplash.com/photo-1558788353-f76d92427f16",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b6",
];

const catImages = [
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  "https://images.unsplash.com/photo-1595433562696-19fdbb1b7fbc",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  "https://images.unsplash.com/photo-1606225457115-9b0e4c7b4f31",
];

/* 🐾 GUARANTEED IMAGE SET */
function getPetImages(type, id) {
  const list = type === "Cat" ? catImages : dogImages;

  // rotate images per pet so pets don't look identical
  return [
    list[id % list.length],
    list[(id + 1) % list.length],
    list[(id + 2) % list.length],
    list[(id + 3) % list.length],
  ];
}

/* 🐶 GENERATED PET NAMES */
function getPetName(type, id) {
  const dogs = ["Bruno", "Rocky", "Buddy", "Max", "Charlie", "Leo"];
  const cats = ["Luna", "Milo", "Bella", "Kitty", "Simba", "Nala"];
  const list = type === "Cat" ? cats : dogs;
  return list[id % list.length];
}

/* 📅 MONTHS → YEARS */
function monthsToYears(months) {
  return `${Math.floor(months / 12)} years`;
}

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/pets")
      .then((res) => res.json())
      .then((data) => {
        const foundPet = data.find(
          (p) => String(p.PetID) === String(id)
        );
        setPet(foundPet);
        if (foundPet) {
          setImages(getPetImages(foundPet.PetType, foundPet.PetID));
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!pet) {
    return <div style={styles.loading}>Loading…</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* MAIN IMAGE */}
        <img
          src={images[activeImg]}
          alt="Pet"
          style={styles.image}
        />

        {/* THUMBNAILS */}
        <div style={{ display: "flex", gap: "10px", padding: "15px" }}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              onClick={() => setActiveImg(i)}
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer",
                opacity: activeImg === i ? 1 : 0.6,
                border:
                  activeImg === i
                    ? "2px solid #2f8f46"
                    : "none",
              }}
            />
          ))}
        </div>

        <div style={styles.info}>
          <h1 style={styles.name}>
            {getPetName(pet.PetType, pet.PetID)}{" "}
            {pet.PetType === "Cat" ? "🐱" : "🐶"}
          </h1>

          <p><strong>Breed:</strong> {pet.Breed}</p>
          <p><strong>Age:</strong> {monthsToYears(pet.AgeMonths)}</p>
          <p><strong>Type:</strong> {pet.PetType}</p>
          <p><strong>Color:</strong> {pet.Color}</p>
          <p><strong>Size:</strong> {pet.Size}</p>
          <p><strong>Weight:</strong> {pet.WeightKg} kg</p>
          <p><strong>Vaccinated:</strong> {pet.Vaccinated ? "Yes" : "No"}</p>
          <p><strong>Adoption Fee:</strong> ₹{pet.AdoptionFee}</p>

          <p style={{ marginTop: "12px" }}>
            <strong>Description:</strong>
          </p>
          <p style={styles.desc}>
            This {pet.PetType.toLowerCase()} has been in the shelter for{" "}
            {pet.TimeInShelterDays} days and is looking for a loving home 💚
          </p>

          <div style={styles.actions}>
            <button
              style={styles.adoptBtn}
              onClick={() => navigate(`/apply/${pet.PetID}`)}
            >
              Adopt Me 🐾
            </button>

            <Link to="/pets" style={styles.back}>
              ← Back to Pets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES (UNCHANGED) */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fdf6ec, #eef7e8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  card: {
    maxWidth: "900px",
    width: "100%",
    background: "#fff",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
  },
  image: {
    width: "100%",
    height: "360px",
    objectFit: "cover",
  },
  info: {
    padding: "30px",
    fontSize: "16px",
    color: "#2f4f2f",
  },
  name: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
  },
  desc: {
    color: "#5f6f52",
    lineHeight: "1.6",
  },
  actions: {
    marginTop: "28px",
    display: "flex",
    gap: "20px",
  },
  adoptBtn: {
    background: "#2f8f46",
    color: "#fff",
    padding: "14px 36px",
    borderRadius: "40px",
    border: "none",
    cursor: "pointer",
  },
  back: {
    textDecoration: "none",
    color: "#2f8f46",
    fontWeight: "600",
    alignSelf: "center",
  },
  loading: {
    fontSize: "22px",
    color: "#2f8f46",
  },
};
