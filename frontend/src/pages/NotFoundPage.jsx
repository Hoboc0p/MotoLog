import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="panel" data-testid="not-found">
      <h2>Eroare 404 - Garajul e gol</h2>
      <p className="info">Adresa cerută nu există pe server.</p>
      <Link to="/">Întoarce-te acasă</Link>
    </section>
  );
}