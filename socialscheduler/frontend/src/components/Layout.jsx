import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const links = [
    { to: "/dashboard", label: "Dashboard", end: true },
    { to: "/compose", label: "Create Post" },
    { to: "/scheduled", label: "Scheduled" },
    { to: "/analytics", label: "Analytics" },
    { to: "/accounts", label: "Accounts" },
  ];

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo">Post<span>wave</span></div>
        <nav style={{ flex: 1 }}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div>
          <div style={{ fontSize: 13, marginBottom: 10 }}>{user?.name}</div>
          <button className="btn-ghost" style={{ width: "100%" }} onClick={() => { logout(); nav("/"); }}>
            Log out
          </button>
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
