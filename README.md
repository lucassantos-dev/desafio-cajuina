# Projeto Frontend e Backend

Este repositório contém um projeto fullstack com um frontend desenvolvido em Next.js e um backend em NestJS, utilizando SQLite3 como banco de dados. O projeto pode ser executado tanto com Docker quanto localmente.

## Tecnologias Utilizadas

### Frontend
- [Next.js](https://nextjs.org/) - Framework para React com suporte a SSR e SSG.
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript para tipagem estática.
- [TailwindCSS](https://tailwindcss.com/) - Framework de CSS utilitário para estilização.
- [ShadCN](https://ui.shadcn.com/) - Biblioteca de componentes para UI.

### Backend
- [NestJS](https://nestjs.com/) - Framework para Node.js baseado em TypeScript.
- [Express](https://expressjs.com/) - Utilizado como camada de roteamento dentro do NestJS.
- [SQLite3](https://www.sqlite.org/) - Banco de dados SQL leve para persistência de dados.

### Outros
- [Docker](https://www.docker.com/) - Para containerização da aplicação.
- [Docker Compose](https://docs.docker.com/compose/) - Para orquestração de containers.
- [Axios](https://axios-http.com/) - Cliente HTTP para requisições à API externa.

## Estrutura do Repositório

```
/
├── frontend/   # Código do frontend (Next.js)
├── backend/    # Código do backend (NestJS)
├── docker-compose.yml  # Configuração do Docker Compose
├── README.md   # Documentação do projeto
```

---

## Executando o Projeto

### Com Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Na raiz do projeto, execute:
   ```sh
   docker-compose up --build
   ```
3. O frontend estará acessível em `http://localhost:3001`
4. O backend estará acessível em `http://localhost:3000`

### Sem Docker (Localmente)

#### Backend

1. Navegue até a pasta `backend/`:
   ```sh
   cd backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor:
   ```sh
   npm run start
   ```
4. O backend estará rodando em `http://localhost:3000`

#### Frontend

1. Navegue até a pasta `frontend/`:
   ```sh
   cd frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o arquivo `.env` com a seguinte variável de ambiente:
   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:3000/
   ```
4. Inicie o frontend:
   ```sh
   npm run dev
   ```
5. O frontend estará acessível em `http://localhost:3001`

## Integração com API Externa

A aplicação consome a API pública do GitHub para buscar dados de usuários e utilizá-los como responsáveis (assignees) das tarefas. 
Esses dados são exibidos na interface de forma amigável para o usuário ao associar uma tarefa a um usuário do GitHub.

## Possíveis Melhorias Futuras

1. **Autenticação com GitHub** - Permitir login usando as credenciais do GitHub para fornecer uma experiência mais personalizada.
2. **Testes Automatizados** - Implementação de testes unitários e de integração para garantir maior confiabilidade do sistema.
3. **Melhoria na Experiência do Usuário** - Refinamento da interface, incluindo animações e feedbacks visuais para interações.

## Considerações Finais

Caso encontre problemas, verifique se todas as dependências estão corretamente instaladas e se as portas 3000 e 3001 estão livres no seu sistema.

Este projeto foi desenvolvido com foco em boas práticas e escalabilidade, seguindo os requisitos do desafio proposto. Obrigado pela oportunidade e espero que gostem do projeto. 🚀

