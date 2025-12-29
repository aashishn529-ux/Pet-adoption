import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdoptionRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 📡 FETCH REQUESTS */
  useEffect(() => {
    fetch("http://localhost:5000/api/adoptions")
      .then(res => res.json())
      .then(data => {
        setRequests(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* 🔄 UPDATE STATUS */
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/adoptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setRequests(prev =>
      prev.map(r => (r._id === id ? { ...r, status } : r))
    );
  };

  if (loading) {
    return (
      <div style={styles.loading}>Loading Adoption Requests...</div>
    );
  }

  return (
    <div style={styles.page}>
      <AdminSidebar />

      <div style={styles.content}>
        <h1 style={styles.heading}>Adoption Requests 📩</h1>

        {requests.length === 0 ? (
          <p style={styles.empty}>No adoption requests yet 🐾</p>
        ) : (
          requests.map(req => (
            <div key={req._id} style={styles.card}>
              <div>
                <h3 style={styles.name}>{req.name}</h3>
                <p style={styles.email}>{req.email}</p>
                <p>
                  Status:{" "}
                  <span style={styles.status(req.status)}>
                    {req.status}
                  </span>
                </p>
              </div>

              <div style={styles.actions}>
                <button
                  style={styles.accept}
                  disabled={req.status === "accepted"}
                  onClick={() => updateStatus(req._id, "accepted")}
                >
                  ✅ Accept
                </button>

                <button
                  style={styles.reject}
                  disabled={req.status === "rejected"}
                  onClick={() => updateStatus(req._id, "rejected")}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES — SAME ADMIN THEME */
const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#FFFDF7",
  },
  content: {
    flex: 1,
    padding: "40px",
  },
  heading: {
    fontSize: "32px",
    color: "#1f4d2b",
    marginBottom: "25px",
  },
  loading: {
    padding: "60px",
    fontSize: "18px",
    textAlign: "center",
    color: "#2f8f46",
  },
  empty: {
    color: "#777",
    fontSize: "16px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  name: {
    margin: 0,
    color: "#1f4d2b",
  },
  email: {
    margin: "4px 0",
    fontSize: "14px",
    color: "#555",
  },
  status: status => ({
    fontWeight: "bold",
    color:
      status === "accepted"
        ? "#2f8f46"
        : status === "rejected"
        ? "#d93025"
        : "#f4b400",
  }),
  actions: {
    display: "flex",
    gap: "10px",
  },
  accept: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#2f8f46",
    color: "#fff",
    cursor: "pointer",
  },
  reject: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#d93025",
    color: "#fff",
    cursor: "pointer",
  },
};
