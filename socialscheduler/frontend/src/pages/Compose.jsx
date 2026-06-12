import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import PlatformPicker from "../components/PlatformPicker";

export default function Compose() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const nav = useNavigate();

  const onFile = (e) => {
    const f = e.target.files[0];
    setMedia(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const submit = async () => {
    setError("");
    if (!content || !platforms.length || !scheduledAt) {
      setError("Content, at least one platform, and a time are required.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("content", content);
      fd.append("platforms", JSON.stringify(platforms));
      fd.append("scheduledAt", new Date(scheduledAt).toISOString());
      if (media) fd.append("media", media);
      await api.post("/posts", fd);
      nav("/scheduled");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to schedule");
    } finally {
      setSaving(false);
    }
  };

  const minTime = new Date(Date.now() + 60000).toISOString().slice(0, 16);

  return (
    <>
      <div className="page-head"><div><h1>Create Post</h1><p>Write once, publish everywhere.</p></div></div>

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <div className="card">
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label>Content</label>
            <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" />
            <div style={{ textAlign: "right", color: "var(--muted)", fontSize: 12, marginTop: 4 }}>{content.length} chars</div>
          </div>
          <div className="field">
            <label>Media (optional)</label>
            <input type="file" accept="image/*,video/*" onChange={onFile} />
          </div>
          <div className="field">
            <label>Platforms</label>
            <PlatformPicker selected={platforms} onChange={setPlatforms} />
          </div>
          <div className="field">
            <label>Schedule for</label>
            <input type="datetime-local" min={minTime} value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
          </div>
          <button className="btn-primary" style={{ width: "100%" }} disabled={saving} onClick={submit}>
            {saving ? "Scheduling…" : "Schedule Post"}
          </button>
        </div>

        <div className="card">
          <label>Live Preview</label>
          <div style={{ background: "var(--surface-2)", borderRadius: 12, padding: 18, marginTop: 8 }}>
            <div className="flex center gap8" style={{ marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--accent)" }} />
              <div><div style={{ fontWeight: 600 }}>You</div><div style={{ fontSize: 12, color: "var(--muted)" }}>now · public</div></div>
            </div>
            <div style={{ whiteSpace: "pre-wrap", minHeight: 40 }}>{content || "Your post will appear here…"}</div>
            {preview && <img src={preview} alt="" style={{ width: "100%", borderRadius: 10, marginTop: 12 }} />}
            <div className="flex gap8 mt16">
              {platforms.length ? platforms.map((p) => <span key={p} className={`pill on-${p}`}>{p}</span>)
                : <span style={{ color: "var(--muted)", fontSize: 13 }}>No platforms selected</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
