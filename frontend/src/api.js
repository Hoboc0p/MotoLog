// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Funcție comună: trimite JSON și aruncă eroare dacă răspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }

  // 204 No Content nu are corp, previne eroarea de parsare JSON
  return res.status === 204 ? null : res.json();
}

export function fetchInterventii() {
  return request("/interventii");
}

export function createInterventie(interventie) {
  return request("/interventii", {
    method: "POST",
    body: JSON.stringify(interventie)
  });
}

export function updateInterventie(id, changes) {
  return request(`/interventii/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes)
  });
}

export function deleteInterventie(id) {
  return request(`/interventii/${id}`, { method: "DELETE" });
}