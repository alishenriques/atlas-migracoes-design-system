# @alishenriques/atlas-design-system

Design System do **Atlas Migrações Leste-Sul**, a plataforma de mapeamento dos artistas do Leste Europeu e da Áustria que migraram para o Brasil (1918–1989), a partir do acervo do MAC USP. Biblioteca de componentes React isolada, consumida pelo app [atlas-migracoes](https://github.com/alishenriques/atlas-migracoes) e publicada no npm público.

Arquitetura completa e convenções: [`docs/ai`](https://github.com/alishenriques/atlas-migracoes/tree/main/docs/ai) no repositório principal. Mudanças grandes vão por PR detalhada e só entram na `main` com aprovação do Alisson.

## Uso

```bash
yarn add @alishenriques/atlas-design-system
```

```tsx
import { Panel, StatGrid } from "@alishenriques/atlas-design-system";
import "@alishenriques/atlas-design-system/styles.css";

<Panel title="Em destaque">…</Panel>
<StatGrid stats={[{ value: "31", label: "artistas" }, { value: "417", label: "obras" }]} />
```

Requer `react` e `react-dom` 19 como peer dependencies.

## Desenvolvimento

```bash
yarn install
yarn dev          # build em watch
```

`yarn lint` · `yarn typecheck` · `yarn test` · `yarn build`

## Identidade visual

Referência: as telas do Atlas na apresentação do projeto (`ap_MIGRACOES.pptx`, slides 12 a 21). Superfícies em azul-noite, um único destaque dourado, títulos em serifa e rótulos pequenos em caixa alta.

| Token | Valor | Uso |
|---|---|---|
| `--atlas-color-bg` | `#070d18` | fundo da aplicação e do mapa |
| `--atlas-color-bg-raised` | `#0d1626` | superfícies elevadas |
| `--atlas-color-accent` | `#d4a64a` | dourado: item ativo, cidades em destaque, ação principal |
| `--atlas-color-documented` / `-inferred` / `-undetermined` | verde / âmbar / cinza | nível de confiabilidade da informação |
| `--atlas-font-serif` | Cormorant Garamond | títulos e números |
| `--atlas-font-sans` | Inter | interface e rótulos |

## Componentes

- `Button` (`primary` dourado, `ghost` com contorno)
- `Eyebrow` — rótulo pequeno em caixa alta (`accent` dourado ou `muted`)
- `Panel` — superfície translúcida sobre o mapa, com título e ação opcionais no cabeçalho (filtros, camadas, destaques)
- `ReliabilityTag` — ponto colorido + rótulo indicando se a informação é documentada, inferida ou indeterminada
- `StatGrid` — faixa de contadores do acervo (artistas, obras, exposições), com ícone opcional
- `SelectField` — select nativo com rótulo, para filtros nos painéis (ex.: país de origem)
- `YearRange` — período com duas alças num só trilho, como a linha do tempo 1918–1989 sob o mapa

## Convenção: quando um componente entra aqui

Qualquer componente **reaproveitável em mais de uma tela** e não amarrado a um dado específico nasce aqui: props dinâmicas (todo texto visível vem por prop), sem dependência de dados da API e sempre com testes unitários. Componentes que dependem do mapa, da API ou do conteúdo do acervo ficam no app.
