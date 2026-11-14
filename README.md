# motim-design-system

Design system da MOTIM: a fonte única de cores, tipografia, espaços, raios e arquivos de marca para todas as interfaces da Motim (o site, em `MotimPR/motim-site`, e qualquer interface do `MotimPR/motim-saas`).

A fonte da verdade do conteúdo é o manual da marca no vault (`Posicionamento e Marca/Manual da marca MOTIM.md`), montado a partir da apresentação de marca da diretoria (documento interno, guardado no Drive, fora deste repositório). O padrão entre repositórios está em `Tecnologia/Design system da MOTIM - padrão entre repositórios.md`, no vault. Os nomes dos tokens são os mesmos nos três lugares.

## O que tem aqui

| Arquivo | O que é |
|---|---|
| `tokens.json` | **A fonte.** Cores, tipografia, espaços e raios, com a nota de uso de cada um |
| `dist/tokens.css` | Variáveis CSS e classes de texto, geradas do `tokens.json` |
| `dist/tokens.js` e `dist/tokens.d.ts` | Os mesmos tokens para JavaScript e TypeScript |
| `marca/` | Logo, símbolo, grafismos do X e textura de fundo |
| `scripts/build.mjs` | Gera o `dist/` |
| `scripts/check-contrast.mjs` | Confere as regras de contraste da marca |

## Como usar em outro repositório

Instale numa versão fixa (o repositório é privado; no build da Cloudflare, use um token de leitura do GitHub):

```bash
npm install github:MotimPR/motim-design-system#v1.0.0
```

No CSS:

```css
@import "@motim/design-system/tokens.css";

.botao { background: var(--roxo-motim); color: var(--branco); border-radius: var(--raio-medio); }
```

No JavaScript:

```js
import { tokens } from "@motim/design-system";
tokens.cores["roxo-motim"]; // "#8a0bfc"
```

Fonte (Lato, Google Fonts):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap">
```

## Cores

| Token | Cor | Uso |
|---|---|---|
| `--branco` | `#ffffff` | Fundo principal |
| `--fundo-cinza` | `#e7e7e7` | Fundo alternativo |
| `--tinta` | `#0f0f0f` | Texto e logo em fundo claro; nunca cor dominante |
| `--roxo-motim` | `#8a0bfc` | Cor da marca: destaques, links, botões, primeira série de gráfico |
| `--rosa-canto` | `#ff00fb` | Canto, ponta do degradê, segunda série de gráfico; texto só a partir de 24px |
| `--roxo-foto` | `#2a085e` | Só no degradê sobre fotos |
| `--detalhe-verde` | `#00ffa7` | Detalhe pontual; nunca texto sobre branco |
| `--cinza-texto` | `#999999` | Texto de apoio só a partir de 24px (2,9:1, use com parcimônia) |
| `--cinza-claro` | `#b7b7b7` | Linhas e contornos; nunca texto |
| `--cinza-legenda` | `#6b6b6b` | Legendas e rodapés pequenos |

Degradê da marca: `--degrade-marca`, de `--roxo-motim` a `--rosa-canto`.

## Tipografia

Lato, uma família só. Classes: `.display` e `.titulo` (Lato Black), `.subtitulo` (Lato Light), `.rotulo` (caixa alta), `.corpo`, `.corpo-forte` e `.legenda`.

## Regras

1. Só se edita o `tokens.json`. Depois: `npm run build`.
2. `npm run check` confere que o `dist/` está em dia e que as regras de contraste passam; roda também no GitHub a cada envio.
3. Toda mudança sobe a versão no `package.json`, ganha tag (`v1.1.0`) e linha no `CHANGELOG.md`.
4. Toda mudança de token atualiza o manual da marca no vault no mesmo dia.
5. Os repositórios que consomem não escrevem cor, fonte ou espaço direto no código: sempre `var(--token)` ou a classe de texto.
