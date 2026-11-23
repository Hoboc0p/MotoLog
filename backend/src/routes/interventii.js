import { Router } from "express";
import { parseId, valideazaInterventie } from "../validation.js";

const router = Router();

let interventii = [
  { id: 1, motoId: "yamaha", title: "Schimb ulei și filtru", type: "Consumabile", cost: 350, is_done: false },
  { id: 2, motoId: "honda", title: "Curățare și ungere lanț", type: "Consumabile", cost: 80, is_done: true },
  { id: 3, motoId: "kawasaki", title: "Verificare plăcuțe frână", type: "Inspecție", cost: 120, is_done: false }
];
let nextId = 4;

function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = interventii.findIndex((i) => i.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Intervenția nu există" });
  }
  return index;
}

router.get("/", (req, res) => {
  res.json(interventii);
});

router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(interventii[index]);
});

router.post("/", (req, res) => {
  const { erori, date } = valideazaInterventie(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const item = { id: nextId++, ...date };
  interventii.push(item);
  res.status(201).json(item);
});

router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;

  const { erori, date } = valideazaInterventie(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  interventii[index] = { ...interventii[index], ...date };
  res.json(interventii[index]);
});

router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  interventii.splice(index, 1);
  res.status(204).end();
});

export default router;