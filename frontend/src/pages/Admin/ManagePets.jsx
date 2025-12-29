import { useEffect, useState } from "react";

export default function ManagePets() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/pets")
      .then(res => res.json())
      .then(setPets);
  }, []);

  const addPet = async () => {
    await fetch("http://localhost:5000/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, breed }),
    });

    setName("");
    setBreed("");

    const res = await fetch("http://localhost:5000/api/pets");
    setPets(await res.json());
  };

  const deletePet = async (id) => {
    await fetch(`http://localhost:5000/api/pets/${id}`, {
      method: "DELETE",
    });

    setPets(pets.filter(p => p._id !== id));
  };

  return (
    <div style={styles.page}>
      <h1>Manage Pets 🐶</h1>

      <div style={styles.form}>
        <input
          placeholder="Pet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <button onClick={addPet}>Add Pet</button>
      </div>

      {pets.map((pet) => (
        <div key={pet._id} style={styles.card}>
          <span>{pet.name} ({pet.breed})</span>
          <button onClick={() => deletePet(pet._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: { padding: "40px" },
  form: { display: "flex", gap: 10, marginBottom: 30 },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: 12,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
  },
};
