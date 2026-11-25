// Gera os arquivos de dist/ a partir do tokens.json.
// Uso: node scripts/build.mjs        (gera)
//      node scripts/build.mjs --check (falha se dist/ estiver desatualizado)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(raiz, "tokens.json"), "utf8"));
const aviso = "MOTIM: gerado de tokens.json por scripts/build.mjs. Não edite à mão; altere o tokens.json.";

const cores = tokens.color.tokens;
const familias = tokens.type.families;
const estilos = tokens.type.groups.flatMap((g) => g.styles.map((s) => ({ ...s, family: g.family })));
const espacos = tokens.spacing.tokens;
const raios = tokens.radius.tokens;

// Fontes: os arquivos WOFF2 ficam em fontes/ e são servidos pelo próprio site (sem depender do Google Fonts).
const fontes = tokens.type.fonts ?? [];
const reserva = tokens.type.fallback;

function css() {
  const linhas = [`/* ${aviso} */`];
  for (const f of fontes) {
    linhas.push(`@font-face { font-family: "${f.family}"; font-style: ${f.style}; font-weight: ${f.weight}; font-display: swap; src: url("../${f.file}") format("woff2"); unicode-range: ${f.unicodeRange}; }`);
  }
  if (reserva) {
    const locais = reserva.local.map((n) => `local("${n}")`).join(", ");
    linhas.push(`@font-face { font-family: "${reserva.name}"; src: ${locais}; size-adjust: ${reserva.sizeAdjust}; ascent-override: ${reserva.ascentOverride}; descent-override: ${reserva.descentOverride}; line-gap-override: ${reserva.lineGapOverride}; }`);
  }
  if (fontes.length || reserva) linhas.push("");
  linhas.push(":root {");
  for (const c of cores) linhas.push(`  --${c.name}: ${c.value};`);
  for (const [nome, valor] of Object.entries(familias)) linhas.push(`  --fonte-${nome}: ${valor};`);
  for (const e of espacos) linhas.push(`  --${e.name}: ${e.value};`);
  for (const r of raios) linhas.push(`  --${r.name}: ${r.value};`);
  linhas.push("  --degrade-marca: linear-gradient(90deg, var(--roxo-motim), var(--rosa-canto));");
  linhas.push("}", "");
  for (const s of estilos) {
    const partes = [
      `font-family: var(--fonte-${s.family})`,
      `font-size: ${s.fontSize}`,
      `line-height: ${s.lineHeight}`,
      `font-weight: ${s.fontWeight}`,
    ];
    if (s.letterSpacing) partes.push(`letter-spacing: ${s.letterSpacing}`, "text-transform: uppercase");
    linhas.push(`.${s.name} { ${partes.join("; ")}; }`);
  }
  return linhas.join("\n") + "\n";
}

function js() {
  const obj = {
    nome: tokens.name,
    cores: Object.fromEntries(cores.map((c) => [c.name, c.value])),
    fontes: familias,
    arquivosDeFonte: fontes.map((f) => ({ familia: f.family, peso: f.weight, arquivo: f.file })),
    texto: Object.fromEntries(
      estilos.map((s) => [
        s.name,
        { fontFamily: familias[s.family], fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: s.fontWeight, ...(s.letterSpacing ? { letterSpacing: s.letterSpacing } : {}) },
      ]),
    ),
    espacos: Object.fromEntries(espacos.map((e) => [e.name, e.value])),
    raios: Object.fromEntries(raios.map((r) => [r.name, r.value])),
    degradeMarca: "linear-gradient(90deg, #8a0bfc, #ff00fb)",
  };
  return `// ${aviso}\nexport const tokens = ${JSON.stringify(obj, null, 2)};\nexport default tokens;\n`;
}

function dts() {
  const nomes = (lista) => lista.map((x) => JSON.stringify(x.name)).join(" | ");
  return `// ${aviso}
export type Cor = ${nomes(cores)};
export type EstiloTexto = ${nomes(estilos)};
export type Espaco = ${nomes(espacos)};
export type Raio = ${nomes(raios)};
export interface EstiloTextoValor { fontFamily: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string }
export declare const tokens: {
  nome: string;
  cores: Record<Cor, string>;
  fontes: Record<string, string>;
  arquivosDeFonte: { familia: string; peso: number; arquivo: string }[];
  texto: Record<EstiloTexto, EstiloTextoValor>;
  espacos: Record<Espaco, string>;
  raios: Record<Raio, string>;
  degradeMarca: string;
};
export default tokens;
`;
}

const saidas = { "dist/tokens.css": css(), "dist/tokens.js": js(), "dist/tokens.d.ts": dts() };
const checar = process.argv.includes("--check");
let desatualizado = [];
mkdirSync(join(raiz, "dist"), { recursive: true });
for (const [arquivo, conteudo] of Object.entries(saidas)) {
  const caminho = join(raiz, arquivo);
  if (checar) {
    if (!existsSync(caminho) || readFileSync(caminho, "utf8") !== conteudo) desatualizado.push(arquivo);
  } else {
    writeFileSync(caminho, conteudo);
    console.log(`gerado ${arquivo}`);
  }
}
if (checar) {
  if (desatualizado.length) {
    console.error(`dist/ desatualizado: ${desatualizado.join(", ")}. Rode: npm run build`);
    process.exit(1);
  }
  console.log("dist/ em dia com o tokens.json");
}
