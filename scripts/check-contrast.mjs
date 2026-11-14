// Confere as regras de contraste da marca (WCAG 2.1).
// Texto pequeno pede 4,5:1; texto grande (24px ou mais) pede 3:1.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const { color } = JSON.parse(readFileSync(join(raiz, "tokens.json"), "utf8"));
const cor = Object.fromEntries(color.tokens.map((t) => [t.name, t.value]));

function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contraste(a, b) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// [texto, fundo, uso permitido]: "pequeno" exige 4,5; "grande" exige 3; "proibido" deve ficar abaixo de 3.
const regras = [
  ["tinta", "branco", "pequeno"],
  ["tinta", "fundo-cinza", "pequeno"],
  ["roxo-motim", "branco", "pequeno"],
  ["roxo-motim", "fundo-cinza", "pequeno"],
  ["branco", "roxo-motim", "pequeno"],
  ["cinza-legenda", "branco", "pequeno"],
  ["tinta", "rosa-canto", "pequeno"],
  ["tinta", "detalhe-verde", "pequeno"],
  ["rosa-canto", "branco", "grande"],
  ["detalhe-verde", "branco", "proibido"],
];

let falhas = 0;
for (const [texto, fundo, uso] of regras) {
  const r = contraste(cor[texto], cor[fundo]);
  const ok = uso === "pequeno" ? r >= 4.5 : uso === "grande" ? r >= 3 : r < 3;
  console.log(`${ok ? "ok   " : "FALHA"} ${texto} sobre ${fundo}: ${r.toFixed(1)}:1 (${uso})`);
  if (!ok) falhas++;
}
if (falhas) {
  console.error(`${falhas} regra(s) de contraste quebrada(s).`);
  process.exit(1);
}
