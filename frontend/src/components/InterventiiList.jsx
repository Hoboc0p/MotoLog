import InterventieCard from "./InterventieCard.jsx";
import styles from "./InterventiiList.module.css";

export default function InterventiiList({ interventii, onToggle, onDelete }) {
  if (interventii.length === 0) {
    return (
      <div className={styles.emptyState} data-testid="empty">
        <div className={styles.emptyIcon}>🔧</div>
        <h3>Nicio operațiune găsită!</h3>
        <p>Nu există nicio intervenție înregistrată pentru această selecție.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
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