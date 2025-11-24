import React from "react";
import { useAuth } from "../context/AuthContext";
import CustomerDashboard from "./CustomerDashboard";
import WorkerDashboard from "./WorkerDashboard";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!user) return <div style={{ padding: 20 }}>Please login</div>;

  return user.role === "worker" ? <WorkerDashboard /> : <CustomerDashboard />;
}
