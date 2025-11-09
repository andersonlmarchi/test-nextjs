# Teste Fullstack - NextJS + Vue 3 + PostgreSQL

Este projeto é uma aplicação **Fullstack** composta por:
- **Backend**: [NestJS](https://nestjs.com/) + [TypeORM](https://typeorm.io/) + PostgreSQL  
- **Frontend**: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)  
- **Banco de Dados**: PostgreSQL


## Funcionalidades

 - Upload de arquivo JSON de contratos
 - Processamento dos contratos e parcelas
 - Persistência no PostgreSQL
 - Dashboard com resumo dos contratos
 - Listagem de contratos e parcelas


## Estrutura do Projeto

- `backend/`: Código do backend em NestJS
- `frontend/`: Código do frontend em Vue 3 + Vite
- `database/`: Scripts para configurar o banco de dados PostgreSQL


## Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)


## Rodando o projeto com Docker Compose

Na raiz do repositório:

```bash
docker-compose up --build -d
```

Isso irá subir os seguintes serviços:
 - backend → http://localhost:3000
 - frontend → http://localhost:5173
 - postgres → localhost:5433 (porta alterada para evitar conflito com instalação local)

E para acessar o sistema, abra o navegador em:
```bash
http://localhost:5173
```

## Banco de Dados

```bash
Host: postgres
Porta: 5433
Database: testemc
Usuário: postgres
Senha: postgres
```

O banco será criado automaticamente no primeiro start.

## Próximos passos

[ ] Melhorar a interface do usuário
[ ] Ajustar validações e tratamento de erros  
[ ] Implementar testes unitários e de integração  
