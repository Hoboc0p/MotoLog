// Valori permise și date de test
const TIPURI = ["Consumabile", "Reparație", "Inspecție"];

const logs = [
  { id: 1, title: "Yamaha MT-07 - Schimb ulei și filtru", is_done: false, type: "Consumabile" },
  { id: 2, title: "Honda Hornet - Înlocuire plăcuțe frână", is_done: true, type: "Reparație" },
  { id: 3, title: "Kawasaki Ninja 400 - Verificare joc lanț", is_done: false, type: "Inspecție" }
];

// Pasul 3: Listarea titlurilor
function listTitles(list) {
  return list.map((item) => item.title);
}

// Pasul 4: Numărarea elementelor active
function countActive(list) {
  return list.filter((item) => !item.is_done).length;
}

// Pasul 5: Căutarea după titlu
function searchByTitle(list, text) {
  const query = text.toLowerCase();
  return list.filter((item) => item.title.toLowerCase().includes(query));
}

// Pasul 6: Calcul id unic și adăugare imutabilă cu validare
function nextId(list) {
  return list.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function addLog(list, title, type = "Consumabile") {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    console.log("Eroare: Titlul nu poate fi gol!");
    return list;
  }

  if (!TIPURI.includes(type)) {
    console.log(`Eroare: Tip invalid: ${type}`);
    return list;
  }

  const newItem = {
    id: nextId(list),
    title: cleanTitle,
    is_done: false,
    type: type
  };

  return [...list, newItem];
}

// Pasul 7: Comutarea stării și ștergerea
function toggleStatus(list, id) {
  return list.map((item) =>
    item.id === id ? { ...item, is_done: !item.is_done } : item
  );
}

function deleteLog(list, id) {
  return list.filter((item) => item.id !== id);
}

// Pasul 8: Teste în consolă
console.log("--- Citire ---");
console.log("Titluri:", listTitles(logs).join(", "));
console.log("Active:", countActive(logs));
console.log("Căutare 'yamaha':", listTitles(searchByTitle(logs, "yamaha")).join(", "));

console.log("--- Adăugare ---");
let updatedLogs = addLog(logs, "Suzuki SV650 - Schimb bujii", "Reparație");
console.log("Lista nouă:", updatedLogs.length, "operațiuni");
console.log("Originalul a rămas cu:", logs.length, "operațiuni");

console.log("--- Modificare și ștergere ---");
updatedLogs = toggleStatus(updatedLogs, 1);
console.log("După bifarea id 1, active:", countActive(updatedLogs));
updatedLogs = deleteLog(updatedLogs, 3);
console.log("După ștergerea id 3:", listTitles(updatedLogs).join(", "));

console.log("--- Validare ---");
addLog(updatedLogs, "");
addLog(updatedLogs, "BMW R1250GS - Diagnoză", "Tuning");