import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AdminSidebar from "../../components/AdminSidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ✅ ADMIN EMAIL (change if needed) */
const ADMIN_EMAIL = "aashishneupane.cs24@bmsce.ac.in";

export default function Admin() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  /* 🔐 ADMIN ACCESS GUARD — FIXED */
  useEffect(() => {
    if (loading) return; // wait for Firebase auth

    if (!user || user.email !== ADMIN_EMAIL) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  /* ⛔ STOP RENDER UNTIL AUTH READY */
  if (loading) {
    return <div style={{ padding: 50 }}>Checking admin access...</div>;
  }

  /* 📡 FETCH ADOPTION REQUESTS */
  useEffect(() => {
    fetch("http://localhost:5000/api/adoptions")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data || []);
        setDataLoading(false);
      })
      .catch(() => setDataLoading(false));
  }, []);

  if (dataLoading) {
    return <div style={{ padding: 50 }}>Loading Admin Dashboard...</div>;
  }

  /* 📊 STATS */
  const total = applications.length;
  const accepted = applications.filter(a => a.status === "accepted").length;
  const pending = applications.filter(a => a.status === "pending").length;
  const rejected = applications.filter(a => a.status === "rejected").length;

  const chartData = [
    { name: "Accepted", value: accepted },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ].filter(d => d.value > 0);

  const COLORS = ["#2f8f46", "#f4b400", "#d93025"];

  return (
    <div style={styles.page}>
      <AdminSidebar />

      <div style={styles.content}>
        <h1 style={styles.heading}>Admin Dashboard 📊</h1>

        {/* 📦 STAT CARDS */}
        <div style={styles.cards}>
          <StatCard title="Total Requests" value={total} />
          <StatCard title="Accepted" value={accepted} />
          <StatCard title="Pending" value={pending} />
          <StatCard title="Rejected" value={rejected} />
        </div>

        {/* 📈 PIE CHART */}
        <div style={styles.chartBox}>
          <h3>Request Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={120} label>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* 📦 STAT CARD */
function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

/* 🎨 STYLES */
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
    marginBottom: "30px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  chartBox: {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
};
