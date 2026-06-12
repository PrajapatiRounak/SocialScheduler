import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import api from "../api/client";

const COLORS = { instagram: "#e1306c", twitter: "#1d9bf0", linkedin: "#0a66c2" };

export default function Analytics() {
  const [data, setData] = useState(null);

  const load = () => api.get("/analytics/summary").then((r) => setData(r.data));
  useEffect(() => { load(); }, []);

  const refresh = async (id) => { await api.post(`/analytics/${id}/refresh`); load(); };

  if (!data) return <div className="empty">Loading…</div>;

  const platformData = Object.entries(data.byPlatform).map(([k, v]) => ({
    name: k, views: v.views, likes: v.likes,
  }));

  return (
    <>
      <div className="page-head"><div><h1>Analytics</h1><p>See what's working across platforms.</p></div></div>

      <div className="grid grid-4">
        <div className="card stat"><span className="num">{data.totalPosts}</span><span className="lbl">Published</span></div>
        <div className="card stat"><span className="num">{data.totalViews}</span><span className="lbl">Views</span></div>
        <div className="card stat"><span className="num">{data.totalLikes}</span><span className="lbl">Likes</span></div>
        <div className="card stat"><span className="num">{data.avgEngagement}%</span><span className="lbl">Avg Engagement</span></div>
      </div>

      {platformData.length > 0 && (
        <div className="card mt24">
          <h3 style={{ fontSize: 22, marginBottom: 16 }}>Views by Platform</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={platformData}>
              <XAxis dataKey="name" stroke="#8b91a3" />
              <YAxis stroke="#8b91a3" />
              <Tooltip contentStyle={{ background: "#1d2029", border: "1px solid #2a2e3a", borderRadius: 10, color: "#fff" }} />
              <Bar dataKey="views" radius={[8, 8, 0, 0]}>
                {platformData.map((e) => <Cell key={e.name} fill={COLORS[e.name] || "#ff5c3d"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="card mt24">
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>Post Performance</h3>
        {data.posts.length === 0 ? (
          <div className="empty">No published posts yet. They'll appear here once the scheduler fires.</div>
        ) : (
          data.posts.map((p) => (
            <div key={p.id} className="post-row">
              <div style={{ flex: 1 }}>
                <div className="content">{p.content}…</div>
                <div className="meta">
                  {p.platforms.map((pl) => <span key={pl} className={`pill on-${pl}`}>{pl}</span>)}
                </div>
              </div>
              <div className="flex gap16 center">
                <div className="stat" style={{ textAlign: "right" }}><span className="num" style={{ fontSize: 20 }}>{p.analytics.views}</span><span className="lbl" style={{ fontSize: 11 }}>views</span></div>
                <div className="stat" style={{ textAlign: "right" }}><span className="num" style={{ fontSize: 20 }}>{p.analytics.likes}</span><span className="lbl" style={{ fontSize: 11 }}>likes</span></div>
                <button className="btn-danger" onClick={() => refresh(p.id)}>↻</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
