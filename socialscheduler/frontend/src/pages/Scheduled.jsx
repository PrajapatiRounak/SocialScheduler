import { useEffect, useState } from "react";
import api from "../api/client";
import PlatformPicker from "../components/PlatformPicker";

export default function Scheduled() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = () => api.get("/posts").then((r) => setPosts(r.data));
  useEffect(() => { load(); }, []);

  const fmt = (d) =>
    new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const startEdit = (p) => {
    setEditing(p._id);
    setForm({ content: p.content, platforms: p.platforms, scheduledAt: new Date(p.scheduledAt).toISOString().slice(0, 16) });
  };

  const saveEdit = async (id) => {
    await api.put(`/posts/${id}`, {
      content: form.content,
      platforms: form.platforms,
      scheduledAt: new Date(form.scheduledAt).toISOString(),
    });
    setEditing(null);
    load();
  };

  const del = async (id) => {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    load();
  };

  return (
    <>
      <div className="page-head"><div><h1>Scheduled</h1><p>Edit or remove before they go live.</p></div></div>

      <div className="card">
        {posts.length === 0 ? (
          <div className="empty">No posts yet.</div>
        ) : (
          posts.map((p) => (
            <div key={p._id} className="post-row">
              {editing === p._id ? (
                <div style={{ flex: 1 }}>
                  <textarea rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
                  <div className="mt8"><PlatformPicker selected={form.platforms} onChange={(pl) => setForm({ ...form, platforms: pl })} /></div>
                  <input className="mt8" type="datetime-local" value={form.scheduledAt} onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })} />
                  <div className="flex gap8 mt8">
                    <button className="btn-primary" onClick={() => saveEdit(p._id)}>Save</button>
                    <button className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  {p.mediaUrl && <img className="post-media" src={p.mediaUrl} alt="" />}
                  <div style={{ flex: 1 }}>
                    <div className="content">{p.content}</div>
                    <div className="meta">
                      <span className="mono">{fmt(p.scheduledAt)}</span>
                      {p.platforms.map((pl) => <span key={pl} className={`pill on-${pl}`}>{pl}</span>)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className={`badge ${p.status}`}>{p.status}</span>
                    {p.status === "scheduled" && (
                      <div className="flex gap8 mt8">
                        <button className="btn-danger" onClick={() => startEdit(p)}>Edit</button>
                        <button className="btn-danger" onClick={() => del(p._id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
