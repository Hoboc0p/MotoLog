const BADGE_CLASSES = {
  "Consumabile": "badge-consumabile",
  "Reparație": "badge-reparatie",
  "Inspecție": "badge-inspectie"
};

export default function InterventieCard({ interventie, onToggle, onDelete }) {
  const badgeClass = BADGE_CLASSES[interventie.type] || "";

  return (
    <li className={interventie.is_done ? "item-card done" : "item-card"}>
      <label className="task-main">
        <input
          type="checkbox"
          checked={interventie.is_done}
          onChange={() => onToggle(interventie.id)}
        />
        <div>
          <h3>{interventie.title}</h3>
          <div className="card-tags">
            <span className={`badge ${badgeClass}`}>{interventie.type}</span>
            <span className="cost-tag">{interventie.cost} lei</span>
          </div>
        </div>
      </label>
      <button
        className="btn-danger"
        onClick={() => onDelete(interventie.id)}
        aria-label={`Șterge ${interventie.title}`}
      >
        Șterge
      </button>
    </li>
  );
}