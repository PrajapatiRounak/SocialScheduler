const PLATFORMS = ["instagram", "twitter", "linkedin"];
const LABELS = { instagram: "Instagram", twitter: "Twitter", linkedin: "LinkedIn" };

export default function PlatformPicker({ selected, onChange }) {
  const toggle = (p) =>
    onChange(selected.includes(p) ? selected.filter((x) => x !== p) : [...selected, p]);

  return (
    <div className="flex gap8">
      {PLATFORMS.map((p) => (
        <span
          key={p}
          className={`pill ${selected.includes(p) ? "on-" + p : ""}`}
          onClick={() => toggle(p)}
        >
          {LABELS[p]}
        </span>
      ))}
    </div>
  );
}
