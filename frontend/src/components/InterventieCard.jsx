const BADGE_CLASSES = {
  "Consumabile": "badge-consumabile",
  "Reparație": "badge-reparatie",
  "Inspecție": "badge-inspectie"
};

export default function InterventieCard({ interventie }) {
  const badgeClass = BADGE_CLASSES[interventie.type] || "";

  return (
    <li className={interventie.is_done ? "item-card done" : "item-card"}>
      <div>
        <h3>{interventie.title}</h3>
        <span className={`badge ${badgeClass}`}>{interventie.type}</span>
      </div>
      <span className="status">{interventie.is_done ? "Finalizat" : "Activ"}</span>
    </li>
  );
}