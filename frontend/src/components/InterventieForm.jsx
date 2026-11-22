import { useState } from "react";
import { MOTOCICLETE, CATEGORII } from "../constants.js";
import styles from "./InterventieForm.module.css";

const MOTO_OPTIONS = MOTOCICLETE.filter((m) => m.id !== "toate");
const TITLU_MAX = 80;

export default function InterventieForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [motoId, setMotoId] = useState("yamaha");
  const [type, setType] = useState("Consumabile");
  const [cost, setCost] = useState("");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul lucrării este obligatoriu.";
    if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    const costNum = Number(cost);
    if (!cost || costNum < 0) return "Te rog introdu un cost valid (pozitiv).";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }

    setEroare("");
    setTrimite(true);

    try {
      await onAdd({
        motoId,
        title: titlu.trim(),
        type,
        cost: Number(cost),
        is_done: false
      });
      setTitlu("");
      setCost("");
      setMotoId("yamaha");
      setType("Consumabile");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlu lucrare
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Schimb ulei..."
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>

      <label>
        Motocicletă
        <select
          value={motoId}
          onChange={(e) => setMotoId(e.target.value)}
          data-testid="form-motoId"
        >
          {MOTO_OPTIONS.map((m) => (
            <option key={m.id} value={m.id}>{m.nume}</option>
          ))}
        </select>
      </label>

      <div className={styles.row}>
        <label>
          Categorie
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            data-testid="form-type"
          >
            {CATEGORII.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>

        <label>
          Cost (lei)
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Ex: 250"
            min="0"
            data-testid="form-cost"
          />
        </label>
      </div>

      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button type="submit" disabled={trimite} className={styles.submitBtn} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă Lucrare"}
      </button>
    </form>
  );
}