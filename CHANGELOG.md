# Changelog

## v1.1.0 (18/11/2026)

- Grupo de texto **Site**, com a escala medida no motim.cc: 12 estilos (`site-hero-grande`, `site-hero`, `site-titulo`, `site-chamada`, `site-destaque`, `site-subtitulo`, `site-corpo`, `site-botao`, `site-menu`, `site-pequeno`, `site-numero`, `site-numero-case`). O site novo usa esses estilos para ficar igual ao atual; os estilos da apresentação (display, titulo, corpo e os outros) continuam para slides, estudos e o produto.
- Cor **grafite** (`#2a2a2a`), do motim.cc: fundo da faixa de contato no fim das páginas.
- Duas regras novas na checagem de contraste: branco sobre grafite e grafite sobre branco.

## v1.0.0 (14/11/2026)

- Primeira versão no repositório próprio. Os tokens e a marca vieram de `motim-saas/design/`, montados a partir da apresentação de marca da diretoria (interna, fora do repositório) e do manual da marca no vault.
- 10 cores, 7 estilos de texto em Lato, 4 espaços e 3 raios, com a nota de uso de cada um.
- Gera `dist/tokens.css` (idêntico ao que estava no motim-saas), `dist/tokens.js` e `dist/tokens.d.ts`.
- Checagem de contraste com as regras da marca e checagem automática no GitHub.
