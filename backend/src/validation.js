export const MOTO_IDS = ["yamaha", "honda", "kawasaki"];
export const TIPURI = ["Consumabile", "Reparație", "Inspecție"];
const TITLU_MAX = 80;

export function valideazaInterventie(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || body.title.trim() === "") {
      erori.push("title este obligatoriu");
    } else if (body.title.trim().length > TITLU_MAX) {
      erori.push(`title are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.title = body.title.trim();
    }
  }

  if (!partial || body.motoId !== undefined) {
    const m = body.motoId ?? "yamaha";
    if (!MOTO_IDS.includes(m)) {
      erori.push(`motoId trebuie să fie una din: ${MOTO_IDS.join(", ")}`);
    } else {
      date.motoId = m;
    }
  }

  if (!partial || body.type !== undefined) {
    const t = body.type ?? "Consumabile";
    if (!TIPURI.includes(t)) {
      erori.push(`type trebuie să fie una din: ${TIPURI.join(", ")}`);
    } else {
      date.type = t;
    }
  }

  if (!partial || body.cost !== undefined) {
    const rawCost = body.cost ?? 0;
    const costNum = Number(rawCost);
    if (rawCost === "" || rawCost === null || !Number.isFinite(costNum) || costNum < 0) {
      erori.push("cost trebuie să fie un număr pozitiv");
    } else {
      date.cost = costNum;
    }
  }

  if (body.is_done !== undefined) {
    if (typeof body.is_done !== "boolean") {
      erori.push("is_done trebuie să fie true sau false");
    } else {
      date.is_done = body.is_done;
    }
  } else if (!partial) {
    date.is_done = false;
  }

  return { erori, date };
}

export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}