# Conectar Frontend (Next.js)

Este projeto é a aplicação frontend desenvolvida em **Next.js** com **TypeScript**, que consome a API NestJS do sistema **Conectar**. A interface oferece: autenticação, gerenciamento de usuários (para gerentes) e perfil do usuário.

---

## Recursos

- Autenticação via JWT
- Páginas de Login e Logout
- Página de Criação de Usuários (acesso apenas para managers)
- Página de Listagem de Usuários Ativos (apenas managers)
- Página de Listagem de Usuários Inativos (apenas managers)
- Página de Perfil do Usuário Atual
- Consumo de API REST NestJS para todas as operações
- Proteção de rotas baseada em roles
- Estilização com TailwindCSS

## Pré-requisitos

- Node.js >= 18
- npm ou yarn
- A API backend deve estar rodando e acessível

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Jxnatan7/conectar-frontend.git
   cd conectar-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou yarn install
   ```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```ini
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

- `NEXT_PUBLIC_API_URL`: URL base da sua API NestJS

## Scripts Disponíveis

| Comando          | Descrição                              |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Inicia o servidor de desenvolvimento   |
| `npm run build`  | Gera o build otimizado para produção   |
| `npm run start`  | Inicia a aplicação no modo de produção |
| `npm run lint`   | Executa ESlint e corrige problemas     |
| `npm run format` | Formata o código com Prettier          |

## Estrutura de Pastas

```text
src/
├── app/
│   │── login/page.tsx
│   │── profile/page.tsx
│   │── signup/page.tsx
│   ├── inactive/page.tsx     # listagem de usuários inativos
│   ├── users/
│   │   ├── page.tsx        # listagem de usuários ativos
│   │   ├── [id]/page.tsx        # listagem de usuários ativos
│   │   └── create/page.tsx       # criação de usuário
│   ├── profile/page.tsx         # perfil do usuário logado
│   └── layout.tsx            # wrapper global (contexto, providers)
├── components/             # componentes compartilhados
├── contexts/               # Context API ou hooks de auth
```

## Páginas e Rotas

### Auth (Login / Logout)

- **/auth/login**: formulario de login (email, senha). Após autenticar, armazena token e redireciona conforme role.
- **/auth/logout**: finaliza sessão e limpa armazenamento.

### Gerenciamento de Usuários (Manager)

- **/users**: lista usuários ativos com paginação e busca.
- **/users/inactive**: lista usuários inativos.
- **/users/create**: formulário para criar novo usuário (role, nome, email, senha).

### Perfil do Usuário

- **/profile**: exibe dados do usuário autenticado e permite edição de perfil.

## Proteção de Rotas

- Implementado um componente para checar se o usuário está autenticado e, opcionalmente, se possui role `manager`.
- Páginas de _users_ (index, inactive, create) só são acessíveis se `role === manager`.
- Rotas públicas: `/auth/login`, assets estáticos.
