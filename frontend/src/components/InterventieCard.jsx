import { Link } from "react-router-dom";
import { BADGE_CLASSES } from "../constants.js";
import styles from "./InterventieCard.module.css";

export default function InterventieCard({ interventie, onToggle, onDelete }) {
  const badgeClass = BADGE_CLASSES[interventie.type] || "";

  return (
    <li
      className={interventie.is_done ? `${styles.card} ${styles.done}` : styles.card}
      data-testid="item"
      data-id={interventie.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={interventie.is_done}
          onChange={() => onToggle(interventie.id)}
          aria-label={`Marchează ${interventie.title}`}
          data-testid="item-toggle"
        />
        <div>
          <Link
            to={`/interventii/${interventie.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {interventie.title}
          </Link>
          <div className={styles.tags}>
            <span className={`badge ${badgeClass}`}>{interventie.type}</span>
            <span className={styles.costTag}>{interventie.cost} lei</span>
          </div>
        </div>
      </div>
      <button
        className="btn-danger"
        onClick={() => onDelete(interventie.id)}
        aria-label={`Șterge ${interventie.title}`}
        data-testid="item-delete"
      >
        Șterge
      </button>
    </li>
  );
}