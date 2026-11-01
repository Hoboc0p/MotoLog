import InterventieCard from "./InterventieCard.jsx";

export default function InterventiiList({ interventii, onToggle, onDelete }) {
  if (interventii.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔧</div>
        <h3>Nicio operațiune găsită!</h3>
        <p>Nu există nicio intervenție înregistrată pentru această selecție.</p>
      </div>
    );
  }

  return (
    <ul className="item-list">
      {interventii.map((item) => (
        <InterventieCard
          key={item.id}
          interventie={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}