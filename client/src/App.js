import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("user") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Routes>
        {/* Protected Route - Only accessible if logged in */}
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
