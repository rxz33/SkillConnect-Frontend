import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BookService from "./pages/BookService.js";
import ServiceDetails from "./pages/ServiceDetails.js";
import WorkerProfile from "./pages/WorkerProfile.js";
import WorkerEarnings from "./pages/WorkerEarnings.js";
import AiRecommend from "./pages/AiRecommend.js";
import CreateListing from "./pages/CreateListing.js";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* SERVICE DETAILS */}
          <Route path="/service/:id" element={<ServiceDetails />} />

          {/* BOOKING */}
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookService />
              </ProtectedRoute>
            }
          />

          {/* WORKER PROFILE */}
          <Route path="/worker/:id" element={<WorkerProfile />} />

          {/* WORKER EARNINGS */}
          <Route
            path="/worker-earnings"
            element={
              <ProtectedRoute>
                <WorkerEarnings />
              </ProtectedRoute>
            }
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* CREATE LISTING */}
          <Route
            path="/create-listing"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />

          {/* AI RECOMMEND */}
          <Route path="/recommend" element={<AiRecommend />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
