import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/posts").then((r) => setPosts(r.data));
    api.get("/analytics/summary").then((r) => setSummary(r.data));
  }, []);

  const scheduled = posts.filter((p) => p.status === "scheduled");
  const published = posts.filter((p) => p.status === "published");
  const upcoming = scheduled.slice(0, 4);

  const fmt = (d) =>
    new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Your command center across every platform.</p>
        </div>
        <Link to="/compose"><button className="btn-primary">+ New Post</button></Link>
      </div>

      <div className="grid grid-4">
        <div className="card stat"><span className="num">{scheduled.length}</span><span className="lbl">Scheduled</span></div>
        <div className="card stat"><span className="num">{published.length}</span><span className="lbl">Published</span></div>
        <div className="card stat"><span className="num">{summary?.totalViews ?? 0}</span><span className="lbl">Total Views</span></div>
        <div className="card stat"><span className="num">{summary?.totalLikes ?? 0}</span><span className="lbl">Total Likes</span></div>
      </div>

      <div className="card mt24">
        <div className="flex center" style={{ justifyContent: "space-between", marginBottom: 8 }}>
          <h3 style={{ fontSize: 22 }}>Upcoming</h3>
          <Link to="/scheduled" style={{ color: "var(--accent)", fontSize: 14 }}>View all →</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="empty">Nothing scheduled yet. <Link to="/compose" style={{ color: "var(--accent)" }}>Create your first post.</Link></div>
        ) : (
          upcoming.map((p) => (
            <div key={p._id} className="post-row">
              <div style={{ flex: 1 }}>
                <div className="content">{p.content}</div>
                <div className="meta">
                  <span className="mono">{fmt(p.scheduledAt)}</span>
                  {p.platforms.map((pl) => <span key={pl} className={`pill on-${pl}`}>{pl}</span>)}
                </div>
              </div>
              <span className={`badge ${p.status}`}>{p.status}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}
