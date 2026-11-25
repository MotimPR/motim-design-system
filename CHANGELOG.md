# Changelog

## v1.2.0 (25/11/2026)

- **Fonte Lato no próprio pacote**, em `fontes/` (WOFF2, subconjunto latino, pesos 300, 400, 700 e 900, licença OFL em `fontes/OFL.txt`). O `dist/tokens.css` passa a trazer as regras `@font-face`, e quem consome não precisa mais do Google Fonts. Motivo: velocidade do site novo, em que a folha do Google Fonts atrasava a primeira exibição em cerca de 0,85 s no celular (Lighthouse de 25/11/2026). Decisão do Felipe em 25/11/2026 (prioridade máxima para SEO e GEO no site).
- **Fonte de reserva "Lato Reserva"**: Arial ajustada às medidas da Lato (`size-adjust` de 95,87%, `ascent-override` de 102,95%, `descent-override` de 22,22%), usada enquanto a Lato carrega, para o texto não pular de lugar. Entra na família `--fonte-lato` logo depois de Lato.
- `tokens.json` ganha a lista `type.fonts` (arquivos) e `type.fallback` (reserva); `dist/tokens.js` ganha `arquivosDeFonte`.
- Os pesos 600 e 800 usados no grupo Site continuam sem arquivo próprio (a Lato não tem esses pesos): o navegador usa 700 e 900, como antes.

## v1.1.1 (18/11/2026)

- `site-corpo` fica em 20px também no celular, como no motim.cc (decisão do Felipe). Antes a nota de uso dizia 18px no celular.

## v1.1.0 (18/11/2026)

- Grupo de texto **Site**, com a escala medida no motim.cc: 12 estilos (`site-hero-grande`, `site-hero`, `site-titulo`, `site-chamada`, `site-destaque`, `site-subtitulo`, `site-corpo`, `site-botao`, `site-menu`, `site-pequeno`, `site-numero`, `site-numero-case`). O site novo usa esses estilos para ficar igual ao atual; os estilos da apresentação (display, titulo, corpo e os outros) continuam para slides, estudos e o produto.
- Cor **grafite** (`#2a2a2a`), do motim.cc: fundo da faixa de contato no fim das páginas.
- Duas regras novas na checagem de contraste: branco sobre grafite e grafite sobre branco.

## v1.0.0 (14/11/2026)

- Primeira versão no repositório próprio. Os tokens e a marca vieram de `motim-saas/design/`, montados a partir da apresentação de marca da diretoria (interna, fora do repositório) e do manual da marca no vault.
- 10 cores, 7 estilos de texto em Lato, 4 espaços e 3 raios, com a nota de uso de cada um.
- Gera `dist/tokens.css` (idêntico ao que estava no motim-saas), `dist/tokens.js` e `dist/tokens.d.ts`.
- Checagem de contraste com as regras da marca e checagem automática no GitHub.
