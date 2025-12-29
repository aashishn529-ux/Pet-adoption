import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Apply from "./pages/Apply";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* 🔐 ADMIN PAGES */
import AdminDashboard from "./pages/Admin/Admin";
import ManagePets from "./pages/Admin/ManagePets";
import AdoptionRequests from "./pages/Admin/AdoptionRequests";

import AuthContext from "./context/AuthContext";

export default function App() {
  const { loading } = useContext(AuthContext);

  /* ⏳ WAIT FOR FIREBASE AUTH */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdfbf7",
          fontSize: "18px",
          color: "#2f8f46",
          fontWeight: "600",
        }}
      >
        Loading 🐾
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fdfbf7", minHeight: "100vh" }}>
      <Navbar />

      <Routes>
        {/* 🌿 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 ADMIN ROUTES */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/pets" element={<ManagePets />} />
        <Route path="/admin/requests" element={<AdoptionRequests />} />
      </Routes>
    </div>
  );
}
