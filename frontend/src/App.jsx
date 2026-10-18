const logs = [
  { id: 1, title: "Yamaha MT-07 - Schimb ulei și filtru", is_done: false, type: "Consumabile" },
  { id: 2, title: "Honda Hornet - Înlocuire plăcuțe frână", is_done: true, type: "Reparație" },
  { id: 3, title: "Kawasaki Ninja 400 - Verificare joc lanț", is_done: false, type: "Inspecție" }
];

export default function App() {
  const active = logs.filter((item) => !item.is_done).length;

  return (
    <>
      <header className="app-header">
        <h1>MotoLog</h1>
        <p>Jurnal de mentenanță și revizii pentru motociclete.</p>
        <p className="app-count">
          {logs.length} operațiuni, dintre care {active} active
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Operațiunile mele</h2>
          {/* Temporar: date brute; componentele apar în Etapa 4 */}
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}