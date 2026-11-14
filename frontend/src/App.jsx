import { useState, useEffect } from "react";
import InterventiiList from "./components/InterventiiList.jsx";
import InterventieForm from "./components/InterventieForm.jsx";
import { fetchInterventii, createInterventie, updateInterventie, deleteInterventie } from "./api.js";

const MOTOCICLETE = [
  { id: "toate", nume: "Toate Motocicletele", model: "Flotă completă", icon: "🏍️" },
  { id: "yamaha", nume: "Yamaha MT-07", model: "2021 • 689cc", icon: "🔴" },
  { id: "honda", nume: "Honda Hornet", model: "2008 • 599cc", icon: "🟡" },
  { id: "kawasaki", nume: "Kawasaki Ninja 400", model: "2022 • 399cc", icon: "🟢" }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
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

    return () => {
      ignore = true;
    };
  }, []);

  // API Call: Adăugare lucrare nouă
  async function handleAdd(taskData) {
    const creat = await createInterventie(taskData);
    setInterventii((prev) => [...prev, creat]);
  }

  // API Call: Bifare/Debifare
  async function handleToggle(id) {
    const currentTask = interventii.find((t) => t.id === id);
    try {
      const actualizat = await updateInterventie(id, { is_done: !currentTask.is_done });
      setInterventii((prev) => prev.map((t) => (t.id === id ? actualizat : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  // API Call: Ștergere
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
Motocicletă: ${MOTOCICLETE.find(m => m.id === selectedMoto)?.nume}
Data raport: ${new Date().toLocaleDateString("ro-RO")}
Status: ${progres}% completat | De achitat: ${costRamas} lei | Achitat: ${costAchitat} lei

[ LUCRĂRI FINALIZATE ]
${finalizate.length > 0 ? finalizate.map(i => `✔ [${i.type}] ${i.title} — ${i.cost} lei`).join("\n") : "Nicio lucrare finalizată."}

[ ÎN LUCRU ]
${active.length > 0 ? active.map(i => `⏳ [${i.type}] ${i.title} — ${i.cost} lei`).join("\n") : "Toate operațiunile sunt finalizate!"}
========================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <header className="app-header">
        <button className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>MotoLog</h1>
        <p>Centru de mentenanță și garaj moto</p>
        <p className="app-count">
          {total} operațiuni afișate, dintre care {active.length} active
        </p>
      </header>

      <main className="container-garage">
        <aside className="garage-sidebar">
          <h3>Garajul Meu</h3>
          <div className="moto-selector">
            {MOTOCICLETE.map((moto) => {
              const activeCount = moto.id === "toate"
                ? interventii.filter(i => !i.is_done).length
                : interventii.filter(i => i.motoId === moto.id && !i.is_done).length;

              return (
                <button
                  key={moto.id}
                  className={`moto-card-btn ${selectedMoto === moto.id ? "active" : ""}`}
                  onClick={() => setSelectedMoto(moto.id)}
                >
                  <span className="moto-icon">{moto.icon}</span>
                  <div className="moto-info">
                    <strong>{moto.nume}</strong>
                    <small>{moto.model}</small>
                  </div>
                  {activeCount > 0 && <span className="moto-badge">{activeCount}</span>}
                </button>
              );
            })}
          </div>

          {/* Formularul nou, pus sub motociclete */}
          <div style={{ marginTop: "24px" }}>
            <h3>Adaugă Lucrare Nouă</h3>
            <InterventieForm onAdd={handleAdd} />
          </div>
        </aside>

        <section className="garage-content">
          <section className="dashboard-grid">
            <div className="stat-card">
              <span className="stat-label">Total Operațiuni</span>
              <span className="stat-value">{total}</span>
            </div>
            <div className="stat-card active-card">
              <span className="stat-label">De achitat</span>
              <span className="stat-value">{costRamas} <small>lei</small></span>
            </div>
            <div className="stat-card done-card">
              <span className="stat-label">Achitat</span>
              <span className="stat-value">{costAchitat} <small>lei</small></span>
            </div>
          </section>

          <div className="panel">
            <div className="progress-box">
              <div className="progress-info">
                <span>Stare revizii • {MOTOCICLETE.find(m => m.id === selectedMoto)?.nume}</span>
                <span>{progres}% completat</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${progres}%` }}></div>
              </div>
            </div>

            <div className="filter-bar">
              {["toate", "Consumabile", "Reparație", "Inspecție"].map((tip) => (
                <button
                  key={tip}
                  className={`filter-btn ${filtruTip === tip ? "active" : ""}`}
                  onClick={() => setFiltruTip(tip)}
                >
                  {tip === "toate" ? "Toate" : tip}
                </button>
              ))}
            </div>

            <div className="panel-header">
              <h2>Operațiuni</h2>
              <div className="panel-actions">
                <button className="btn-fisa" onClick={() => setShowFisa(true)}>
                  📄 Fișă Service
                </button>
                {finalizate.length > 0 && (
                  <button className="btn-clear-done" onClick={handleClearDone}>
                    Curăță finalizate ({finalizate.length})
                  </button>
                )}
              </div>
            </div>

            {/* Marcajele data-testid pe mesaje conform cerinței */}
            {loading && <p className="info" data-testid="loading">Se încarcă garajul...</p>}

            {error && (
              <p className="error" data-testid="error">
                Eroare: {error}. Verifică conexiunea la API.
              </p>
            )}

            {/* Randarea listei chiar dacă există o eroare de Toggle/Delete */}
            {!loading && (
              <InterventiiList
                interventii={interventiiFiltrate}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
          </div>
        </section>
      </main>

      {showFisa && (
        <div className="modal-overlay" onClick={() => setShowFisa(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Fișă Tehnică: {MOTOCICLETE.find(m => m.id === selectedMoto)?.nume}</h3>
              <button className="btn-close" onClick={() => setShowFisa(false)}>✕</button>
            </div>
            <div className="fisa-sheet">
              <div className="fisa-meta">
                <span><strong>Data:</strong> {new Date().toLocaleDateString("ro-RO")}</span>
                <span><strong>Cost total:</strong> {costAchitat + costRamas} lei</span>
              </div>
              <div className="fisa-section">
                <h4>Lucrări Finalizate ({finalizate.length})</h4>
                {finalizate.length === 0 ? <p className="text-muted">Fără lucrări finalizate.</p> : (
                  <ul>
                    {finalizate.map((i) => (
                      <li key={i.id}>✔ {i.title} — <span className="mono">{i.cost} lei</span></li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="fisa-section">
                <h4>Lucrări În Lucru ({active.length})</h4>
                {active.length === 0 ? <p className="text-muted">Nicio lucrare activă.</p> : (
                  <ul>
                    {active.map((i) => (
                      <li key={i.id}>⏳ {i.title} — <span className="mono">{i.cost} lei</span></li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-copy" onClick={handleCopyFisa}>
                {copied ? "✔ Copiat în clipboard!" : "Copiază Raport"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}