// MOTIM: gerado de tokens.json por scripts/build.mjs. Não edite à mão; altere o tokens.json.
export type Cor = "branco" | "fundo-cinza" | "tinta" | "roxo-motim" | "rosa-canto" | "roxo-foto" | "detalhe-verde" | "cinza-texto" | "cinza-claro" | "cinza-legenda";
export type EstiloTexto = "display" | "titulo" | "subtitulo" | "rotulo" | "corpo" | "corpo-forte" | "legenda";
export type Espaco = "espaco-1" | "espaco-2" | "espaco-3" | "espaco-4";
export type Raio = "raio-reto" | "raio-medio" | "raio-simbolo";
export interface EstiloTextoValor { fontFamily: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string }
export declare const tokens: {
  nome: string;
  cores: Record<Cor, string>;
  fontes: Record<string, string>;
  texto: Record<EstiloTexto, EstiloTextoValor>;
  espacos: Record<Espaco, string>;
  raios: Record<Raio, string>;
  degradeMarca: string;
};
export default tokens;
