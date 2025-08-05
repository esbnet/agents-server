# NLW Agents Server

Sistema de salas inteligentes com transcrição de áudio e respostas automatizadas usando IA. O projeto permite criar salas, fazer upload de áudios que são transcritos automaticamente, e fazer perguntas que são respondidas com base no conteúdo transcrito usando embeddings e busca semântica.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** - Banco de dados relacional
- **pgvector** - Extensão PostgreSQL para busca vetorial
- **Drizzle ORM** - ORM TypeScript-first
- **Google Gemini AI** - IA para transcrição e geração de respostas
- **Zod** - Validação de schemas TypeScript
- **Docker** - Containerização

## 📋 Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Chave de API do Google Gemini AI

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd server
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# HTTP
PORT=3333
NODE_ENV=dev
HOST="localhost"

# Database
DATABASE_URL="postgres://postgres:postgres@localhost:5432/nlw_agents_db"

# Gemini AI
GOOGLE_GENAI_API_KEY=sua_chave_api_aqui
```

3. **Instale as dependências**
```bash
npm install
```

## 🐳 Setup com Docker

1. **Inicie o banco de dados PostgreSQL**
```bash
docker-compose up -d
```

2. **Execute as migrações e seed do banco**
```bash
npm run db:reset
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor estará disponível em `http://localhost:3333`

## 📚 API Endpoints

### Salas (Rooms)
- `POST /rooms` - Criar nova sala
- `GET /rooms` - Listar todas as salas
- `GET /rooms/:id` - Obter sala por ID

### Perguntas (Questions)
- `POST /rooms/:roomId/questions` - Criar pergunta em uma sala
- `GET /rooms/:roomId/questions` - Listar perguntas de uma sala

### Áudio
- `POST /rooms/:roomId/audio` - Upload e transcrição de áudio

### Health Check
- `GET /health` - Verificar status da API

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **rooms** - Armazena informações das salas
- **questions** - Perguntas e respostas das salas
- **audio_chunks** - Transcrições de áudio com embeddings vetoriais

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com watch mode
npm run dev

# Produção
npm start

# Reset completo do banco (migrações + seed)
npm run db:reset

# Apenas seed do banco
npm run db:seed
```

## 🏗️ Arquitetura

```
src/
├── db/
│   ├── migrations/     # Migrações do banco
│   ├── schema/         # Schemas das tabelas
│   ├── connection.ts   # Conexão com PostgreSQL
│   └── seed.ts         # Dados iniciais
├── http/
│   └── routes/         # Rotas da API
├── service/
│   └── gemini.ts       # Integração com Gemini AI
├── env.ts              # Validação de variáveis de ambiente
└── server.ts           # Configuração do servidor
```

## 🤖 Funcionalidades de IA

### Transcrição de Áudio
- Upload de arquivos de áudio
- Transcrição automática usando Gemini AI
- Armazenamento com embeddings vetoriais

### Sistema de Perguntas Inteligentes
- Busca semântica usando pgvector
- Respostas baseadas no conteúdo transcrito
- Contexto educacional otimizado

## 🔒 Segurança

⚠️ **Atenção**: Este projeto foi identificado com algumas vulnerabilidades de segurança que devem ser corrigidas antes do deploy em produção:

- Implementar proteção CSRF
- Sanitizar inputs para prevenir XSS
- Adicionar validação de path traversal
- Melhorar tratamento de erros
- Configurar CORS adequadamente

## 🚀 Deploy

### Docker
```bash
# Build da imagem
docker build -t nlw-agents-server .

# Executar container
docker run -p 3333:3333 --env-file .env nlw-agents-server
```

### Variáveis de Ambiente para Produção
- Configure `NODE_ENV=production`
- Use credenciais seguras para o banco
- Configure CORS para domínios específicos
- Use HTTPS em produção

## 📝 Licença

Este projeto está sob a licença ISC.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

Desenvolvido durante o NLW (Next Level Week) 🚀