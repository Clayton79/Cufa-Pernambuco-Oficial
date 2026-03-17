# 🏫 ONG Wilson Aquino — Sistema de Gestão

Sistema completo de gestão para a ONG Wilson Aquino (Educação & Saúde), com painel administrativo, controle de voluntários, projetos, doações, eventos, relatórios e backups.

🔗 **Frontend:** [https://clayton79.github.io/ONG-Wilson-Aquino/](https://clayton79.github.io/ONG-Wilson-Aquino/)
🔗 **API:** [https://ong-wilson-aquino-api.onrender.com](https://ong-wilson-aquino-api.onrender.com)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Screenshots](#-screenshots)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação Local](#-instalação-local)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Credenciais Padrão](#-credenciais-padrão)
- [Documentação da API](#-documentação-da-api)
  - [Autenticação](#autenticação)
  - [Voluntários](#voluntários)
  - [Projetos](#projetos)
  - [Doações](#doações)
  - [Eventos](#eventos)
  - [Dashboard](#dashboard)
  - [Relatórios](#relatórios)
  - [Backups](#backups)
  - [Health Check](#health-check)
- [Modelos de Dados](#-modelos-de-dados)
- [Frontend — Páginas](#-frontend--páginas)
- [Deploy](#-deploy)
- [Licença](#-licença)

---

## 🌟 Visão Geral

O sistema permite gerenciar todos os aspectos operacionais de uma ONG:

| Módulo | Descrição |
|--------|-----------|
| **Dashboard** | Painel com KPIs, gráficos de doações/mês, voluntários/mês, projetos por status |
| **Voluntários** | Cadastro completo com CPF, endereço, habilidades, disponibilidade |
| **Projetos** | Gestão com status (planejamento → ativo → concluído), orçamento, metas |
| **Doações** | Registro financeiro e material, vinculação a projetos, recibos |
| **Eventos** | Agendamento, controle de participantes, check-in |
| **Relatórios** | Geração em JSON e CSV (voluntários, doações, projetos, eventos) |
| **Backups** | Criação e restauração de backups dos dados |
| **Configurações** | Gerenciamento de perfil e preferências do sistema |

### Papéis de Usuário

| Papel | Permissões |
|-------|-----------|
| `admin` | Acesso total: CRUD de todos os recursos, relatórios, backups, configurações |
| `volunteer` | Visualizar dados, participar de eventos |
| `donor` | Visualizar dados, registrar doações |
| `visitor` | Visualizar dados públicos |

---

## 🛠 Tecnologias

### Backend

| Tecnologia | Uso |
|-----------|-----|
| **Node.js 18+** | Runtime |
| **Express 4** | Framework HTTP |
| **TypeScript** | Tipagem estática (ES2022, strict mode) |
| **Zod** | Validação de schemas |
| **JSON Web Token** | Autenticação (Bearer token, 24h expiração) |
| **bcryptjs** | Hash de senhas (10 salt rounds) |
| **UUID v4** | Geração de IDs únicos |
| **JSON File Store** | Persistência em arquivos JSON com controle de concorrência (mutex) |

### Frontend

| Tecnologia | Uso |
|-----------|-----|
| **React 18** | UI Library |
| **TypeScript** | Tipagem estática |
| **Vite 5** | Build tool e dev server |
| **React Router v6** | Roteamento SPA |
| **Tailwind CSS 3** | Estilização utility-first |
| **Zustand** | Gerenciamento de estado global |
| **React Hook Form + Zod** | Formulários com validação |
| **Recharts** | Gráficos e visualizações |
| **Lucide React** | Ícones |

### Infraestrutura

| Serviço | Uso |
|---------|-----|
| **GitHub Pages** | Hospedagem do frontend |
| **Render** | Hospedagem do backend (plano free) |
| **GitHub Actions** | CI/CD para deploy automático do frontend |

---

## 🏗 Arquitetura

```
┌─────────────────────────────────────────┐
│           GitHub Pages (Frontend)       │
│    React SPA + Tailwind + Zustand       │
│    https://clayton79.github.io/         │
│            ONG-Wilson-Aquino/           │
└───────────────┬─────────────────────────┘
                │ HTTPS (fetch)
                ▼
┌─────────────────────────────────────────┐
│         Render (Backend API)            │
│    Express + TypeScript + JWT           │
│    https://ong-wilson-aquino-api        │
│              .onrender.com              │
├─────────────────────────────────────────┤
│  Controllers → Services → Repositories  │
│         ↓           ↓                   │
│   Zod Validation   JSON File Store      │
│                    (./data/*.json)       │
└─────────────────────────────────────────┘
```

### Estrutura do Projeto

```
ONG-Wilson-Aquino/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuração centralizada
│   │   ├── controllers/     # Lógica de requisição/resposta
│   │   ├── middlewares/     # Auth, validação, error handler
│   │   ├── models/          # Tipos, interfaces, schemas Zod
│   │   ├── repositories/   # Acesso a dados (JSON files)
│   │   ├── routes/          # Definição de rotas Express
│   │   ├── services/        # Lógica de negócio
│   │   ├── utils/           # FileStore, JWT, password, seed, pagination
│   │   └── index.ts         # Entry point do servidor
│   ├── data/                # Arquivos JSON (banco de dados)
│   ├── backups/             # Backups automáticos
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layouts/     # AppLayout (sidebar), AuthLayout
│   │   │   └── router/      # Rotas + ProtectedRoute
│   │   ├── pages/           # Páginas por módulo
│   │   │   ├── auth/        # Login, Register, Recover
│   │   │   ├── dashboard/   # Dashboard com gráficos
│   │   │   ├── volunteers/  # Lista + Formulário
│   │   │   ├── projects/    # Lista + Formulário
│   │   │   ├── donations/   # Lista + Formulário
│   │   │   ├── events/      # Lista + Formulário
│   │   │   ├── reports/     # Geração de relatórios
│   │   │   └── settings/    # Configurações do sistema
│   │   ├── shared/
│   │   │   ├── components/  # UI reutilizável (Button, Card, Modal...)
│   │   │   ├── services/    # API client + funções tipadas
│   │   │   ├── stores/      # Zustand (authStore)
│   │   │   └── types/       # Tipos compartilhados
│   │   └── widgets/         # Sidebar, Logo
│   ├── package.json
│   └── vite.config.ts
├── .github/workflows/       # CI/CD GitHub Actions
├── render.yaml              # Blueprint de deploy Render
└── README.md
```

---

## 🚀 Instalação Local

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9

### 1. Clone o repositório

```bash
git clone https://github.com/Clayton79/ONG-Wilson-Aquino.git
cd ONG-Wilson-Aquino
```

### 2. Backend

```bash
cd backend
npm install
npm run seed     # Popula dados iniciais (4 usuários, 8 voluntários, 5 projetos, 8 doações, 5 eventos)
npm run dev      # Inicia em http://localhost:3001
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev      # Inicia em http://localhost:5173
```

O Vite está configurado com proxy reverso: todas as chamadas para `/api` são redirecionadas para `http://localhost:3001`.

### Scripts Disponíveis

#### Backend

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `tsx watch src/index.ts` | Dev server com hot-reload |
| `build` | `tsc && npm run seed:prod` | Compila TypeScript + seed |
| `start` | `node dist/index.js` | Inicia versão de produção |
| `seed` | `tsx src/utils/seed.ts` | Popula dados iniciais (dev) |
| `seed:prod` | `node dist/utils/seed.js` | Popula dados iniciais (prod) |
| `lint` | `eslint src --ext .ts` | Verifica código |
| `format` | `prettier --write "src/**/*.ts"` | Formata código |

#### Frontend

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `vite` | Dev server com HMR |
| `build` | `tsc && vite build` | Build de produção |
| `preview` | `vite preview` | Preview do build |
| `lint` | `eslint . --ext ts,tsx` | Verifica código |
| `format` | `prettier --write "src/**/*.{ts,tsx}"` | Formata código |

---

## 🔐 Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3001` | Porta do servidor |
| `JWT_SECRET` | `default-secret-change-me` | Chave secreta para tokens JWT |
| `JWT_EXPIRES_IN` | `24h` | Tempo de expiração do token |
| `DATA_DIR` | `./data` | Diretório dos arquivos JSON |
| `BACKUP_DIR` | `./backups` | Diretório de backups |
| `CORS_ORIGIN` | `http://localhost:5173` | Origens CORS permitidas (separar por vírgula) |
| `NODE_ENV` | `development` | Ambiente (development/production) |

---

## 🔑 Credenciais Padrão

Após executar `npm run seed`, os seguintes usuários são criados:

| Papel | Email | Senha |
|-------|-------|-------|
| **Admin** | `admin@wilsonaquino.org` | `admin123` |
| **Voluntário** | `maria@email.com` | `voluntario123` |
| **Doador** | `joao@email.com` | `doador123` |
| **Visitante** | `ana@email.com` | `visitante123` |

---

## 📖 Documentação da API

**Base URL:** `https://ong-wilson-aquino-api.onrender.com/api`

Todas as rotas (exceto auth e health check) requerem autenticação via header:

```
Authorization: Bearer <token>
```

### Formato de Resposta Padrão

```json
{
  "success": true,
  "data": { },
  "message": "Operação realizada com sucesso"
}
```

```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": ["campo: mensagem de erro"]
}
```

### Paginação

Rotas de listagem suportam query params:

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | number | `1` | Página atual |
| `limit` | number | `10` | Itens por página (máx. 100) |
| `search` | string | — | Busca full-text |
| `sortBy` | string | `createdAt` | Campo de ordenação |
| `sortOrder` | `asc` \| `desc` | `desc` | Direção da ordenação |

Resposta paginada:

```json
{
  "success": true,
  "data": [],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

---

### Autenticação

#### `POST /api/auth/login`

Realiza login e retorna token JWT.

**Body:**
```json
{
  "email": "admin@wilsonaquino.org",
  "password": "admin123"
}
```

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Administrador",
      "email": "admin@wilsonaquino.org",
      "role": "admin",
      "phone": "(11) 99999-0001",
      "isActive": true,
      "createdAt": "2025-12-17T...",
      "updatedAt": "2025-12-17T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": "2026-03-18T..."
  }
}
```

#### `POST /api/auth/register`

Registra um novo usuário.

**Body:**
```json
{
  "name": "Novo Usuário",
  "email": "novo@email.com",
  "password": "senha123",
  "role": "visitor",
  "phone": "(11) 99999-0000"
}
```

**Validação:**
- `name`: mínimo 2 caracteres
- `email`: formato válido
- `password`: mínimo 6 caracteres
- `role`: opcional (`admin`, `volunteer`, `donor`, `visitor`)
- `phone`: opcional

#### `POST /api/auth/recover`

Solicita recuperação de senha.

**Body:**
```json
{
  "email": "admin@wilsonaquino.org"
}
```

#### `GET /api/auth/profile`

🔒 **Requer autenticação**

Retorna o perfil do usuário logado.

#### `PUT /api/auth/profile`

🔒 **Requer autenticação**

Atualiza o perfil do usuário logado.

**Body:** campos a atualizar (`name`, `phone`, `avatar`)

---

### Voluntários

🔒 Todas as rotas requerem autenticação. Criação, edição e exclusão requerem papel `admin`.

#### `GET /api/volunteers`

Lista voluntários com paginação e busca.

**Query params:** `page`, `limit`, `search`, `sortBy`, `sortOrder`

#### `GET /api/volunteers/:id`

Retorna um voluntário por ID.

#### `POST /api/volunteers`

🔒 **Requer papel: `admin`**

Cria um novo voluntário.

**Body:**
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "(11) 99999-0001",
  "cpf": "123.456.789-00",
  "birthDate": "1990-05-15",
  "address": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "skills": ["educação", "saúde", "informática"],
  "availability": "Sábados e domingos",
  "notes": "Observações opcionais",
  "isActive": true
}
```

**Validação:**
- `name`, `email`, `phone`, `cpf`, `birthDate`, `address`, `city`, `zipCode`, `availability`: obrigatórios
- `state`: exatamente 2 caracteres (UF)
- `skills`: array de strings
- `notes`, `userId`, `isActive`: opcionais

#### `PUT /api/volunteers/:id`

🔒 **Requer papel: `admin`**

Atualiza um voluntário.

#### `DELETE /api/volunteers/:id`

🔒 **Requer papel: `admin`**

Remove um voluntário.

---

### Projetos

🔒 Todas as rotas requerem autenticação. Criação, edição e exclusão requerem papel `admin`.

#### `GET /api/projects`

Lista projetos com paginação e busca.

#### `GET /api/projects/:id`

Retorna um projeto por ID.

#### `POST /api/projects`

🔒 **Requer papel: `admin`**

**Body:**
```json
{
  "name": "Educação para Todos",
  "description": "Projeto de alfabetização para adultos da comunidade",
  "status": "active",
  "startDate": "2026-01-15",
  "endDate": "2026-12-31",
  "budget": 50000,
  "raised": 15000,
  "coordinator": "Dr. Wilson Aquino",
  "volunteerIds": ["uuid1", "uuid2"],
  "goals": ["Alfabetizar 100 adultos", "Formar 20 tutores"],
  "category": "educação",
  "location": "Centro Comunitário",
  "beneficiaries": 200,
  "notes": "Observações opcionais"
}
```

**Status possíveis:** `planning`, `active`, `paused`, `completed`, `cancelled`

**Validação:**
- `name`: mínimo 2 caracteres
- `description`: mínimo 10 caracteres
- `coordinator`: mínimo 2 caracteres
- `volunteerIds`, `goals`: arrays de strings

#### `PUT /api/projects/:id`

🔒 **Requer papel: `admin`**

#### `DELETE /api/projects/:id`

🔒 **Requer papel: `admin`**

---

### Doações

🔒 Todas as rotas requerem autenticação. Criação requer papel `admin` ou `donor`. Edição e exclusão requer `admin`.

#### `GET /api/donations`

Lista doações com paginação, busca e filtros adicionais.

**Query params extras:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `type` | `financial` \| `material` | Filtrar por tipo |
| `startDate` | string (ISO) | Data inicial |
| `endDate` | string (ISO) | Data final |

#### `GET /api/donations/:id`

Retorna uma doação por ID.

#### `POST /api/donations`

🔒 **Requer papel: `admin` ou `donor`**

**Body (financeira):**
```json
{
  "donorId": "uuid",
  "donorName": "Empresa ABC",
  "type": "financial",
  "amount": 5000,
  "description": "Doação mensal para projeto educacional",
  "date": "2026-03-15",
  "projectId": "uuid",
  "projectName": "Educação para Todos",
  "receiptNumber": "REC-2026-001",
  "notes": "Observações opcionais"
}
```

**Body (material):**
```json
{
  "donorId": "uuid",
  "donorName": "João da Silva",
  "type": "material",
  "description": "Doação de materiais escolares",
  "items": ["500 cadernos", "1000 lápis", "200 borrachas"],
  "date": "2026-03-15"
}
```

**Tipos possíveis:** `financial`, `material`

#### `PUT /api/donations/:id`

🔒 **Requer papel: `admin`**

#### `DELETE /api/donations/:id`

🔒 **Requer papel: `admin`**

---

### Eventos

🔒 Todas as rotas requerem autenticação. Criação, edição e exclusão requerem papel `admin`.

#### `GET /api/events`

Lista eventos com paginação e busca.

#### `GET /api/events/upcoming`

Retorna próximos eventos (ordenados por data).

#### `GET /api/events/:id`

Retorna um evento por ID.

#### `POST /api/events`

🔒 **Requer papel: `admin`**

**Body:**
```json
{
  "name": "Mutirão de Limpeza",
  "description": "Mutirão de limpeza e revitalização do parque municipal",
  "status": "scheduled",
  "date": "2026-04-10",
  "startTime": "08:00",
  "endTime": "12:00",
  "location": "Parque Municipal Wilson Aquino",
  "maxParticipants": 50,
  "participantIds": [],
  "category": "meio ambiente",
  "projectId": "uuid",
  "projectName": "Horta Comunitária",
  "notes": "Observações opcionais"
}
```

**Status possíveis:** `scheduled`, `in_progress`, `completed`, `cancelled`

**Validação:**
- `name`: mínimo 2 caracteres
- `description`: mínimo 10 caracteres
- `location`: mínimo 2 caracteres

#### `PUT /api/events/:id`

🔒 **Requer papel: `admin`**

#### `DELETE /api/events/:id`

🔒 **Requer papel: `admin`**

#### `POST /api/events/:id/participants`

🔒 **Requer papel: `admin` ou `volunteer`**

Adiciona um participante ao evento.

**Body:**
```json
{
  "volunteerId": "uuid"
}
```

#### `DELETE /api/events/:id/participants/:volunteerId`

🔒 **Requer papel: `admin`**

Remove um participante do evento.

---

### Dashboard

#### `GET /api/dashboard/summary`

🔒 **Requer autenticação**

Retorna resumo completo para o painel.

**Resposta:**
```json
{
  "success": true,
  "data": {
    "totalVolunteers": 8,
    "activeVolunteers": 7,
    "totalDonations": 8,
    "totalDonationAmount": 85500,
    "activeProjects": 3,
    "totalProjects": 5,
    "upcomingEvents": 3,
    "totalEvents": 5,
    "recentDonations": [],
    "recentVolunteers": [],
    "upcomingEventsList": [],
    "donationsByMonth": [
      { "month": "Jan", "amount": 15000 },
      { "month": "Fev", "amount": 8500 }
    ],
    "volunteersByMonth": [
      { "month": "Jan", "count": 3 },
      { "month": "Fev", "count": 2 }
    ],
    "projectsByStatus": {
      "planning": 1,
      "active": 3,
      "completed": 1
    }
  }
}
```

---

### Relatórios

#### `GET /api/reports/:type`

🔒 **Requer papel: `admin`**

Gera relatórios por tipo.

**Tipos disponíveis:** `volunteers`, `donations`, `projects`, `events`

**Query params:**

| Parâmetro | Valor | Descrição |
|-----------|-------|-----------|
| `format` | `json` (padrão) | Retorna dados em JSON |
| `format` | `csv` | Download do arquivo CSV |
| `startDate` | string (ISO) | Filtro de data inicial |
| `endDate` | string (ISO) | Filtro de data final |

**Exemplos:**

```
GET /api/reports/donations?format=json
GET /api/reports/volunteers?format=csv
GET /api/reports/projects?startDate=2026-01-01&endDate=2026-12-31
```

---

### Backups

#### `GET /api/backups`

🔒 **Requer papel: `admin`**

Lista todos os backups disponíveis.

#### `POST /api/backups`

🔒 **Requer papel: `admin`**

Cria um novo backup de todos os dados (copia os arquivos JSON para diretório com timestamp).

#### `POST /api/backups/restore/:backupName`

🔒 **Requer papel: `admin`**

Restaura dados a partir de um backup específico.

---

### Health Check

#### `GET /health`

⚡ **Sem autenticação**

Verifica se o servidor está ativo.

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-16T12:00:00.000Z"
}
```

---

## 📊 Modelos de Dados

### User

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | string (UUID) | ✅ | Identificador único |
| `name` | string | ✅ | Nome completo |
| `email` | string | ✅ | Email (único) |
| `password` | string | ✅ | Hash bcrypt |
| `role` | enum | ✅ | `admin`, `volunteer`, `donor`, `visitor` |
| `phone` | string | — | Telefone |
| `avatar` | string | — | URL do avatar |
| `isActive` | boolean | ✅ | Status ativo |
| `createdAt` | string (ISO) | ✅ | Data de criação |
| `updatedAt` | string (ISO) | ✅ | Data de atualização |

### Volunteer

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | string (UUID) | ✅ | Identificador único |
| `name` | string | ✅ | Nome completo |
| `email` | string | ✅ | Email |
| `phone` | string | ✅ | Telefone |
| `cpf` | string | ✅ | CPF |
| `birthDate` | string | ✅ | Data de nascimento |
| `address` | string | ✅ | Endereço |
| `city` | string | ✅ | Cidade |
| `state` | string (2) | ✅ | UF |
| `zipCode` | string | ✅ | CEP |
| `skills` | string[] | ✅ | Habilidades |
| `availability` | string | ✅ | Disponibilidade |
| `notes` | string | — | Observações |
| `isActive` | boolean | ✅ | Status ativo |

### Project

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | string (UUID) | ✅ | Identificador único |
| `name` | string | ✅ | Nome do projeto |
| `description` | string | ✅ | Descrição detalhada |
| `status` | enum | ✅ | `planning`, `active`, `paused`, `completed`, `cancelled` |
| `startDate` | string | ✅ | Data de início |
| `endDate` | string | — | Data de término |
| `budget` | number | — | Orçamento (R$) |
| `raised` | number | — | Valor arrecadado (R$) |
| `coordinator` | string | ✅ | Nome do coordenador |
| `volunteerIds` | string[] | ✅ | IDs dos voluntários vinculados |
| `goals` | string[] | ✅ | Metas do projeto |
| `category` | string | ✅ | Categoria |
| `location` | string | — | Localização |
| `beneficiaries` | number | — | Número de beneficiários |

### Donation

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | string (UUID) | ✅ | Identificador único |
| `donorId` | string | ✅ | ID do doador |
| `donorName` | string | ✅ | Nome do doador |
| `type` | enum | ✅ | `financial`, `material` |
| `amount` | number | — | Valor (R$) — para doações financeiras |
| `description` | string | ✅ | Descrição |
| `items` | string[] | — | Itens doados — para doações materiais |
| `date` | string | ✅ | Data da doação |
| `projectId` | string | — | Projeto vinculado |
| `projectName` | string | — | Nome do projeto vinculado |
| `receiptNumber` | string | — | Número do recibo |

### OngEvent

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | string (UUID) | ✅ | Identificador único |
| `name` | string | ✅ | Nome do evento |
| `description` | string | ✅ | Descrição |
| `status` | enum | ✅ | `scheduled`, `in_progress`, `completed`, `cancelled` |
| `date` | string | ✅ | Data |
| `startTime` | string | ✅ | Hora de início |
| `endTime` | string | ✅ | Hora de término |
| `location` | string | ✅ | Local |
| `maxParticipants` | number | — | Máximo de participantes |
| `participantIds` | string[] | ✅ | IDs dos participantes |
| `category` | string | ✅ | Categoria |
| `projectId` | string | — | Projeto vinculado |

---

## 🖥 Frontend — Páginas

| Rota | Página | Acesso |
|------|--------|--------|
| `/login` | Login | Público |
| `/register` | Cadastro | Público |
| `/recover` | Recuperar senha | Público |
| `/dashboard` | Painel principal com KPIs e gráficos | Autenticado |
| `/volunteers` | Lista de voluntários | Autenticado |
| `/volunteers/new` | Cadastrar voluntário | Admin |
| `/volunteers/:id/edit` | Editar voluntário | Admin |
| `/projects` | Lista de projetos | Autenticado |
| `/projects/new` | Cadastrar projeto | Admin |
| `/projects/:id/edit` | Editar projeto | Admin |
| `/donations` | Lista de doações | Autenticado |
| `/donations/new` | Registrar doação | Admin, Donor |
| `/donations/:id/edit` | Editar doação | Admin |
| `/events` | Lista de eventos | Autenticado |
| `/events/new` | Cadastrar evento | Admin |
| `/events/:id/edit` | Editar evento | Admin |
| `/reports` | Geração de relatórios (JSON/CSV) | Admin |
| `/settings` | Configurações do sistema | Admin |

---

## 🚢 Deploy

### Frontend (GitHub Pages)

O deploy é automático via **GitHub Actions** ao fazer push na branch `main`:

1. Instala dependências (`npm ci`)
2. Compila TypeScript e builda com Vite (`npm run build`)
3. Faz upload do artefato (`frontend/dist/`)
4. Deploya para GitHub Pages

**URL:** `https://clayton79.github.io/ONG-Wilson-Aquino/`

### Backend (Render)

O deploy é automático via **Render Blueprint** (`render.yaml`):

| Configuração | Valor |
|-------------|-------|
| Runtime | Node.js 20 |
| Plano | Free |
| Região | Oregon |
| Root Dir | `backend/` |
| Build | `npm install && npm run build` |
| Start | `npm start` |
| Health Check | `/health` |

**URL:** `https://ong-wilson-aquino-api.onrender.com`

**Variáveis de ambiente no Render:**
- `NODE_ENV=production`
- `JWT_SECRET` (gerado automaticamente)
- `CORS_ORIGIN=https://clayton79.github.io`

> ⚠️ **Nota:** No plano free do Render, o serviço entra em standby após 15 minutos sem tráfego. A primeira requisição após o standby pode levar ~1 minuto para responder.

> ⚠️ **Nota:** O sistema usa arquivos JSON para persistência. No plano free do Render, o filesystem é efêmero — os dados são resetados a cada novo deploy ou restart. O seed é executado automaticamente durante o build.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ para a ONG Wilson Aquino — Educação & Saúde.
