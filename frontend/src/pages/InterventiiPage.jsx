import { useState, useEffect } from "react";
import InterventiiList from "../components/InterventiiList.jsx";
import InterventieForm from "../components/InterventieForm.jsx";
import { fetchInterventii, createInterventie, updateInterventie, deleteInterventie } from "../api.js";
import { MOTOCICLETE } from "../constants.js";
import styles from "./InterventiiPage.module.css";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function InterventiiPage() {
  const [interventii, setInterventii] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tema, setTema] = useState(temaInitiala);
  const [selectedMoto, setSelectedMoto] = useState("toate");
  const [filtruTip, setFiltruTip] = useState("toate");
  const [showFisa, setShowFisa] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchInterventii();
        if (!ignore) setInterventii(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

  async function handleAdd(taskData) {
    const creat = await createInterventie(taskData);
    setInterventii((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const currentTask = interventii.find((t) => t.id === id);
    try {
      const actualizat = await updateInterventie(id, { is_done: !currentTask.is_done });
      setInterventii((prev) => prev.map((t) => (t.id === id ? actualizat : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteInterventie(id);
      setInterventii((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleClearDone() {
    setInterventii((prev) => prev.filter((item) => !item.is_done));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const interventiiFiltrate = interventii.filter((item) => {
    const matchMoto = selectedMoto === "toate" || item.motoId === selectedMoto;
    const matchTip = filtruTip === "toate" || item.type === filtruTip;
    return matchMoto && matchTip;
  });

  const total = interventiiFiltrate.length;
  const finalizate = interventiiFiltrate.filter((item) => item.is_done);
  const active = interventiiFiltrate.filter((item) => !item.is_done);
  const progres = total > 0 ? Math.round((finalizate.length / total) * 100) : 0;

  const costAchitat = finalizate.reduce((acc, item) => acc + item.cost, 0);
  const costRamas = active.reduce((acc, item) => acc + item.cost, 0);

  function handleCopyFisa() {
    const text = `========================================
   M O T O L O G  -  F I Ș Ă   S E R V I C E
========================================
Motocicletă: ${MOTOCICLETE.find((m) => m.id === selectedMoto)?.nume}
Data raport: ${new Date().toLocaleDateString("ro-RO")}
Status: ${progres}% completat | De achitat: ${costRamas} lei | Achitat: ${costAchitat} lei

[ LUCRĂRI FINALIZATE ]
${finalizate.length > 0 ? finalizate.map((i) => `✔ [${i.type}] ${i.title} — ${i.cost} lei`).join("\n") : "Nicio lucrare finalizată."}

[ ÎN LUCRU ]
${active.length > 0 ? active.map((i) => `⏳ [${i.type}] ${i.title} — ${i.cost} lei`).join("\n") : "Toate operațiunile sunt finalizate!"}
========================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className={styles.topBar}>
        <button className={styles.themeToggle} onClick={handleTema} aria-pressed={tema === "dark"}>
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <div className={styles.summary}>
          {total} operațiuni afișate, dintre care {active.length} active
        </div>
      </div>

      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <h3>Garajul Meu</h3>
          <div className={styles.motoSelector}>
            {MOTOCICLETE.map((moto) => {
              const activeCount = moto.id === "toate"
                ? interventii.filter((i) => !i.is_done).length
                : interventii.filter((i) => i.motoId === moto.id && !i.is_done).length;

              return (
                <button
                  key={moto.id}
                  className={`${styles.motoBtn} ${selectedMoto === moto.id ? styles.motoBtnActive : ""}`}
                  onClick={() => setSelectedMoto(moto.id)}
                >
                  <span className={styles.motoIcon}>{moto.icon}</span>
                  <div className={styles.motoInfo}>
                    <strong>{moto.nume}</strong>
                    <small>{moto.model}</small>
                  </div>
                  {activeCount > 0 && <span className={styles.motoBadge}>{activeCount}</span>}
                </button>
              );
            })}
          </div>

          <div className={styles.formSection}>
            <h3>Adaugă Lucrare Nouă</h3>
            <InterventieForm onAdd={handleAdd} />
          </div>
        </aside>

        <section className={styles.content}>
          <section className={styles.dashboardGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Operațiuni</span>
              <span className={styles.statValue}>{total}</span>
            </div>
            <div className={`${styles.statCard} ${styles.activeCard}`}>
              <span className={styles.statLabel}>De achitat</span>
              <span className={styles.statValue}>{costRamas} <small>lei</small></span>
            </div>
            <div className={`${styles.statCard} ${styles.doneCard}`}>
              <span className={styles.statLabel}>Achitat</span>
              <span className={styles.statValue}>{costAchitat} <small>lei</small></span>
            </div>
          </section>

          <div className="panel">
            <div className={styles.progressBox}>
              <div className={styles.progressInfo}>
                <span>Stare revizii • {MOTOCICLETE.find((m) => m.id === selectedMoto)?.nume}</span>
                <span>{progres}% completat</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressBar} style={{ width: `${progres}%` }}></div>
              </div>
            </div>

            <div className={styles.filterBar}>
              {["toate", "Consumabile", "Reparație", "Inspecție"].map((tip) => (
                <button
                  key={tip}
                  className={`${styles.filterBtn} ${filtruTip === tip ? styles.filterBtnActive : ""}`}
                  onClick={() => setFiltruTip(tip)}
                >
                  {tip === "toate" ? "Toate" : tip}
                </button>
              ))}
            </div>

            <div className={styles.panelHeader}>
              <h2>Operațiuni</h2>
              <div className={styles.panelActions}>
                <button className={styles.btnFisa} onClick={() => setShowFisa(true)}>
                  📄 Fișă Service
                </button>
                {finalizate.length > 0 && (
                  <button className={styles.btnClearDone} onClick={handleClearDone}>
                    Curăță finalizate ({finalizate.length})
                  </button>
                )}
              </div>
            </div>

            {loading && <p className="info" data-testid="loading">Se încarcă garajul...</p>}

            {error && (
              <p className="error" data-testid="error">
                Eroare: {error}. Verifică conexiunea la API.
              </p>
            )}

            {!loading && (
              <InterventiiList
                interventii={interventiiFiltrate}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
          </div>
        </section>
      </div>

      {showFisa && (
        <div className={styles.modalOverlay} onClick={() => setShowFisa(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Fișă Tehnică: {MOTOCICLETE.find((m) => m.id === selectedMoto)?.nume}</h3>
              <button className={styles.btnClose} onClick={() => setShowFisa(false)}>✕</button>
            </div>
            <div className={styles.fisaSheet}>
              <div className={styles.fisaMeta}>
                <span><strong>Data:</strong> {new Date().toLocaleDateString("ro-RO")}</span>
                <span><strong>Cost total:</strong> {costAchitat + costRamas} lei</span>
              </div>
              <div className={styles.fisaSection}>
                <h4>Lucrări Finalizate ({finalizate.length})</h4>
                {finalizate.length === 0 ? <p className={styles.textMuted}>Fără lucrări finalizate.</p> : (
                  <ul>
                    {finalizate.map((i) => (
                      <li key={i.id}>✔ {i.title} — <span className={styles.mono}>{i.cost} lei</span></li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.fisaSection}>
                <h4>Lucrări În Lucru ({active.length})</h4>
                {active.length === 0 ? <p className={styles.textMuted}>Nicio lucrare activă.</p> : (
                  <ul>
                    {active.map((i) => (
                      <li key={i.id}>⏳ {i.title} — <span className={styles.mono}>{i.cost} lei</span></li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnCopy} onClick={handleCopyFisa}>
                {copied ? "✔ Copiat în clipboard!" : "Copiază Raport"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}