import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchInterventie } from "../api.js";
import { MOTOCICLETE, BADGE_CLASSES } from "../constants.js";
import styles from "./InterventieDetaliuPage.module.css";

export default function InterventieDetaliuPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetchInterventie(id)
      .then((data) => {
        if (!ignore) {
          setTask(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <p className="info" data-testid="loading">Se încarcă detaliile...</p>;

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">Intervenția nu a putut fi încărcată: {error}</p>
        <Link to="/">Înapoi la listă</Link>
      </section>
    );
  }

  const moto = MOTOCICLETE.find((m) => m.id === task.motoId);
  const badgeClass = BADGE_CLASSES[task.type] || "";

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>Înapoi la listă</Link>
      <h2 className={task.is_done ? styles.done : undefined} data-testid="detail-title">
        {task.title}
      </h2>
      <dl className={styles.fields}>
        <dt>Motocicletă</dt>
        <dd>{moto?.nume ?? task.motoId}</dd>
        <dt>Categorie</dt>
        <dd><span className={`badge ${badgeClass}`}>{task.type}</span></dd>
        <dt>Cost</dt>
        <dd>{task.cost} lei</dd>
        <dt>Status</dt>
        <dd>{task.is_done ? "Finalizat" : "În lucru"}</dd>
        <dt>ID</dt>
        <dd>{task.id}</dd>
      </dl>
    </section>
  );
}