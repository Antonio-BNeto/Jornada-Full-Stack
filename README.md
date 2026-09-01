# Jornada Full Stack — Clone do Spotify

Projeto de estudo full stack que recria as telas e o funcionamento básico do Spotify: listagem de artistas e músicas, página de artista, player de áudio funcional e navegação entre as páginas. É um monorepo com duas partes independentes: `front-end` (React) e `back-end` (Express + MongoDB).

## Estrutura do repositório

```
front-end/   Aplicação React (Vite)
back-end/    API REST em Express que expõe os dados do MongoDB
```

## O que foi feito

### Front-end (`front-end/`)

- **React 19 + Vite**, roteamento com `react-router-dom`.
- Páginas: `Home`, `Artists`, `Artist`, `Songs`, `Song` (`src/pages`).
- Componentes reutilizáveis (`src/components`):
  - `Header` — topo com logo e link para a home.
  - `Main` / `ItemList` / `SingleItem` — grade de artistas e músicas em destaque, reaproveitada na Home e nas páginas "Artists"/"Songs".
  - `SongList` / `SongItem` — lista de músicas de um artista, com paginação incremental ("Veja mais").
  - `Player` — player de áudio com play/pause, avançar/voltar para músicas aleatórias do mesmo artista, barra de progresso e tempo decorrido.
- Ícones com `@fortawesome/react-fontawesome`.
- Consumo da API própria via `axios` (`front-end/api/api.js`), buscando artistas e músicas do back-end.

### Back-end (`back-end/`)

- Servidor **Express** (`api/server.js`) com CORS habilitado, expondo:
  - `GET /artists` — lista de artistas.
  - `GET /songs` — lista de músicas.
- Conexão com **MongoDB Atlas** (`api/connect.js`), banco `Spotify`.
- Script `api/insertMany.js` usado para popular o banco a partir dos dados mockados que existiam no front-end (`assets/database/artists.js` e `songs.js`).

### Fluxo geral

O front-end não usa mais dados mockados diretamente: ele consome a API do back-end, que por sua vez lê os dados do MongoDB (populado previamente pelo script de seed). Isso fecha o ciclo front → API → banco de dados.

## O que foi para aprender sobre React

Este projeto foi usado como prática dos seguintes conceitos:

- **Componentização**: quebrar a UI em componentes pequenos e reutilizáveis (`ItemList`/`SingleItem` servem tanto para artistas quanto para músicas; `SongList`/`SongItem` são reaproveitados em `Artist`).
- **Props e composição**: passar dados e comportamento entre componentes via props (`type`, `itemsArray`, `path`, `idPath`, callbacks, etc.).
- **Hooks**:
  - `useState` para estado local (play/pause e tempo do player, quantidade de itens exibidos na lista de músicas).
  - `useEffect` para efeitos colaterais com `setInterval`, sincronizando o áudio com a UI e limpando o intervalo no cleanup.
  - `useRef` para acessar diretamente elementos do DOM (`<audio>` e a barra de progresso) sem re-renderizar o componente a cada atualização.
- **Roteamento com React Router**: `BrowserRouter`, `Routes`/`Route`, `Link`, e os hooks `useParams` (ler o `:id` da URL) e `useLocation` (mudar o comportamento do componente conforme a rota atual, ex: mostrar "Mostrar tudo" só na Home).
- **Renderização de listas**: uso de `map`/`filter` com `key` para renderizar coleções dinâmicas vindas da API.
- **Renderização condicional**: exibir ou ocultar blocos de UI dependendo de props/estado (ex: `Main` decide se mostra artistas, músicas ou ambos).
- **Integração com API externa**: buscar dados assíncronos com `axios` e alimentar os componentes com dados reais em vez de mocks estáticos.
- **Manipulação de mídia (`<audio>`)**: controlar play/pause, tempo atual e progresso de reprodução via `ref`, sem bibliotecas externas de player.

## Como rodar o projeto

### Back-end

Crie um arquivo `back-end/.env` (baseado em `back-end/.env.example`) com a string de conexão do MongoDB:

```
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster-url>/?retryWrites=true&w=majority&appName=<app-name>
```

```bash
cd back-end
npm install
node api/server.js
```

O servidor sobe em `http://localhost:3000`.

### Front-end

```bash
cd front-end
npm install
npm run dev
```

A aplicação React sobe (por padrão) em `http://localhost:5173` e consome a API acima.

> É necessário que o back-end esteja rodando antes do front-end, pois `front-end/api/api.js` busca os dados de artistas e músicas assim que o módulo é carregado.
