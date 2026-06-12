import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Compose from "./pages/Compose";
import Scheduled from "./pages/Scheduled";
import Analytics from "./pages/Analytics";
import Accounts from "./pages/Accounts";
import "./styles/index.css";

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<Protected><Layout /></Protected>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/scheduled" element={<Scheduled />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/accounts" element={<Accounts />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
