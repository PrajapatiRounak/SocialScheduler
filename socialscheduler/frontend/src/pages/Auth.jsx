import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const nav = useNavigate();

  const submit = async () => {
    setError("");
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      nav("/dashboard");
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h1>Post<span style={{ color: "var(--accent)" }}>wave</span></h1>
        <p className="sub">
          {mode === "login" ? "Welcome back. Schedule everywhere." : "One dashboard for every platform."}
        </p>

        {error && <div className="error">{error}</div>}

        {mode === "register" && (
          <div className="field">
            <label>Name</label>
            <input value={form.name} onChange={set("name")} placeholder="Your name" />
          </div>
        )}
        <div className="field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••" />
        </div>

        <button className="btn-primary" style={{ width: "100%" }} onClick={submit}>
          {mode === "login" ? "Log in" : "Create account"}
        </button>

        <div className="switch">
          {mode === "login" ? "No account? " : "Already have one? "}
          <a onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Sign up" : "Log in"}
          </a>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a onClick={() => nav("/")} style={{ color: "var(--muted)", cursor: "pointer", fontSize: "13px", textDecoration: "underline" }}>
            ← Back to Landing
          </a>
        </div>
      </div>
    </div>
  );
}
