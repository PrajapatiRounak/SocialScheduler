import { useEffect, useState } from "react";
import api from "../api/client";

const ALL = [
  { id: "instagram", name: "Instagram" },
  { id: "twitter", name: "Twitter (X)" },
  { id: "linkedin", name: "LinkedIn" },
];

export default function Accounts() {
  const [connected, setConnected] = useState([]);

  const load = () => api.get("/accounts").then((r) => setConnected(r.data));
  useEffect(() => { load(); }, []);

  const isOn = (id) => connected.some((a) => a.platform === id);

  const connect = async (id) => { await api.post("/accounts/connect", { platform: id }); load(); };
  const disconnect = async (id) => { await api.delete(`/accounts/${id}`); load(); };

  return (
    <>
      <div className="page-head"><div><h1>Accounts</h1><p>Connect the platforms you want to post to.</p></div></div>

      <div className="grid grid-3">
        {ALL.map((p) => (
          <div key={p.id} className="card">
            <div className="flex center gap12">
              <div className={`pill on-${p.id}`} style={{ padding: "8px 12px" }}>{p.name}</div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13, margin: "14px 0" }}>
              {isOn(p.id) ? "Connected (simulated)" : "Not connected"}
            </div>
            {isOn(p.id) ? (
              <button className="btn-ghost" style={{ width: "100%" }} onClick={() => disconnect(p.id)}>Disconnect</button>
            ) : (
              <button className="btn-primary" style={{ width: "100%" }} onClick={() => connect(p.id)}>Connect</button>
            )}
          </div>
        ))}
      </div>

      <div className="card mt24" style={{ borderColor: "var(--accent)" }}>
        <h3 style={{ fontSize: 18 }}>Note for evaluation</h3>
        <p style={{ color: "var(--muted)", marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>
          Connections are simulated. Real publishing needs OAuth + approved developer apps
          (Instagram Graph API, Twitter API v2, LinkedIn API). The publisher service is
          structured so each platform's real API call can be dropped in without changing the rest of the app.
        </p>
      </div>
    </>
  );
}
