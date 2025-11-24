import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BookService from "./pages/BookService";
import ServiceDetails from "./pages/ServiceDetails";
import WorkerProfile from "./pages/WorkerProfile";
import WorkerEarnings from "./pages/WorkerEarnings";
import AiRecommend from "./pages/AiRecommend";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worker/:id" element={<WorkerProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<ProtectedRoute><BookService />
             </ProtectedRoute>
            }
           />
          <Route path="/worker-earnings" element={<ProtectedRoute><WorkerEarnings />
            </ProtectedRoute>
            }
          />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/recommend" element={<AiRecommend />} />
          {/* other routes like create-listing, listing/:id can come here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
