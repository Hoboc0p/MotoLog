import { useState } from "react";
import InterventiiList from "./components/InterventiiList.jsx";

const MOTOCICLETE = [
  { id: "toate", nume: "Toate Motocicletele", model: "Flotă completă", icon: "🏍️" },
  { id: "yamaha", nume: "Yamaha MT-07", model: "2021 • 689cc", icon: "🔴" },
  { id: "honda", nume: "Honda Hornet", model: "2008 • 599cc", icon: "🟡" },
  { id: "kawasaki", nume: "Kawasaki Ninja 400", model: "2022 • 399cc", icon: "🟢" }
];

const INTERVENTII_INITIALE = [
  { id: 1, motoId: "yamaha", title: "Yamaha MT-07 - Schimb ulei și filtru", is_done: false, type: "Consumabile", cost: 350 },
  { id: 2, motoId: "honda", title: "Honda Hornet - Înlocuire plăcuțe frână", is_done: true, type: "Reparație", cost: 220 },
  { id: 3, motoId: "kawasaki", title: "Kawasaki Ninja 400 - Verificare joc lanț", is_done: false, type: "Inspecție", cost: 100 }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [interventii, setInterventii] = useState(INTERVENTII_INITIALE);
  const [tema, setTema] = useState(temaInitiala);
  const [selectedMoto, setSelectedMoto] = useState("toate");
  const [filtruTip, setFiltruTip] = useState("toate");
  const [showFisa, setShowFisa] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleToggle(id) {
    setInterventii((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_done: !item.is_done } : item))
    );
  }

  function handleDelete(id) {
    setInterventii((prev) => prev.filter((item) => item.id !== id));
  }

  function handleClearDone() {
    setInterventii((prev) => prev.filter((item) => !item.is_done));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Filtrare cumulată: motocicletă + tip intervenție
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
        {/* Coloana Stângă: Selector Garaj */}
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
        </aside>

        {/* Coloana Dreaptă: Date și Intervenții */}
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

            <InterventiiList
              interventii={interventiiFiltrate}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          </div>
        </section>
      </main>

      {/* Modal Fișă Tehnică */}
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