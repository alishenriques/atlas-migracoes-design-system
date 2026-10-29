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

`yarn lint` · `yarn typecheck` · `yarn test` · `yarn test:coverage` · `yarn build`

## Identidade visual

Referência: as telas do Atlas na apresentação do projeto (`ap_MIGRACOES.pptx`, slides 12 a 21). Superfícies em azul-noite, um único destaque dourado, títulos em serifa e rótulos pequenos em caixa alta.

| Token | Valor | Uso |
|---|---|---|
| `--atlas-color-bg` | `#070d18` | fundo da aplicação e do mapa |
| `--atlas-color-bg-raised` | `#0d1626` | superfícies elevadas |
| `--atlas-color-accent` | `#d4a64a` | dourado: item ativo, cidades em destaque, ação principal |
| `--atlas-color-documented` / `-inferred` / `-undetermined` | verde / âmbar / cinza | nível de confiabilidade da informação |
| `--atlas-color-entity-*` | verde, verde-água, ouro, lilás, azul, rosa | tipo de entidade na Rede Relacional e nos mapas: `artist`, `work`, `exhibition`, `publication`, `institution`, `place` |
| `--atlas-font-serif` | Cormorant Garamond | títulos e números |
| `--atlas-font-sans` | Inter | interface e rótulos |

## Componentes

- `Button` (`primary` dourado, `ghost` com contorno)
- `Eyebrow` — rótulo pequeno em caixa alta (`accent` dourado ou `muted`)
- `Panel` — superfície translúcida sobre o mapa, com título e ação opcionais no cabeçalho (filtros, camadas, destaques)
- `ReliabilityTag` — ponto colorido + rótulo indicando se a informação é documentada, inferida ou indeterminada
- `StatGrid` — faixa de contadores do acervo (artistas, obras, exposições), com ícone opcional à esquerda do número e do rótulo
- `CollectionIcon` — ícones decorativos do acervo (`artists`, `works`, `exhibitions`, `publications`, `countries`), em traço fino marfim com um ponto dourado, como a logo
- `EventIcon` — ícones decorativos de eventos da vida (`birth`, `death`): sol nascendo e se pondo no horizonte, no mesmo traço marfim com ponto dourado
- `Avatar` — retrato redondo de uma pessoa; sem `src`, mostra o desenho "ainda sem foto" (cabeça e ombros em traço marfim, ponto dourado, borda tracejada)
- `SelectField` — select com rótulo, para filtros nos painéis (ex.: país de origem). Opções simples usam o select nativo; se alguma opção tiver `icon` (ex.: bandeira), vira uma lista própria acessível (combobox + listbox, teclado completo), porque o select nativo não mostra imagens
- `YearRange` — período com duas alças num só trilho, como a linha do tempo 1918–1989 sob o mapa
- `SegmentedControl` — uma escolha entre poucas opções curtas lado a lado, como a década do mapa histórico
- `Legend` — pontos coloridos com o nome de cada tipo de entidade (artistas, obras, exposições, publicações, instituições, lugares), nas cores `--atlas-color-entity-*`
- `Skeleton` — forma do conteúdo que ainda está carregando (`block` para painéis e mapas, `text` com `lines` para parágrafos, `circle` para retratos), com um brilho dourado lento que passa por cima; é decorativo (`aria-hidden`), então quem usa anuncia o carregamento uma vez (ex.: região `role="status"`). Sem animação quando o sistema pede menos movimento
- `SearchField` — campo de busca com rótulo, para filtrar uma lista enquanto se digita (ex.: buscar artista em Trajetórias). Lupa na família "Traço"; um botão (`clearLabel`) e a tecla Escape limpam o campo
- `Accordion` — seção que fecha no cabeçalho (título, `count` e `status` em destaque) e abre deslizando para mostrar o conteúdo; o status fica ao lado do botão, não dentro, para poder ser interativo (ex.: um `Toggletip`). Sem animação quando o sistema pede menos movimento
- `Toggletip` — explicação curta que abre ao clicar no `trigger` (ex.: um `ReliabilityTag`) e fecha com outro clique, Escape ou clique fora; funciona por toque e teclado, ao contrário de um tooltip de hover
- `Portrait` — foto de uma pessoa num quadro 4:5 que ocupa a largura do contêiner, com o desenho "ainda sem foto" enquanto não há imagem e uma legenda opcional (ex.: crédito)
- `Button` com `asChild` — aplica o estilo do botão ao único filho (ex.: o link do roteador do app), para um link parecer botão

## Convenção: quando um componente entra aqui

Qualquer componente **reaproveitável em mais de uma tela** e não amarrado a um dado específico nasce aqui: props dinâmicas (todo texto visível vem por prop), sem dependência de dados da API e sempre com testes unitários. Componentes que dependem do mapa, da API ou do conteúdo do acervo ficam no app.
