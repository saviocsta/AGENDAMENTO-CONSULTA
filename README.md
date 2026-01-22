AGENDAMENTO DE CONSULTAS

Este é um projeto de agendamento de consultas desenvolvido para a prova final utilizando AdonisJS.

Pré-requisitos

Node.js

NPM (geralmente já vem com o Node.js)

Banco de dados PostgreSQL em execução

Tecnologias Utilizadas

Node.js

AdonisJS

PostgreSQL

TypeScript

Instruções de Execução do Projeto
Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd agendamento

Instalar dependências
npm install

Executar as migrations
node ace migration:run

Iniciar o servidor
node ace serve --watch

Autenticação

A autenticação é realizada através de token de acesso.

Após o login, o token deve ser enviado no header das requisições protegidas:

Authorization: Bearer TOKEN

Rotas Implementadas
Cadastrar usuários

POST /auth/register

{
  "nome": "Admin",
  "email": "admin@ifma.com",
  "password": "123456",
  "tipo": "paciente"
}

Login de usuários

POST /auth/login

{
  "email": "admin@ifma.com",
  "password": "123456"
}

Cadastrar profissional

POST /auth/register

{
  "nome": "AdminPRO",
  "email": "adminPRO@ifma.com",
  "password": "123456",
  "tipo": "administrador"
}

Login do profissional (para pegar o token)

POST /auth/login

{
  "email": "admin@ifma.com",
  "password": "123456"
}

Cadastro da especialidade

(necessário token do profissional)

POST /profissional

Header

Authorization: Bearer TOKEN

{
  "nome": "Dr João",
  "especialidade": "Cardiologia"
}

Listar profissionais

(necessário token do profissional)

GET /profissional

Header

Authorization: Bearer TOKEN

Cadastrar disponibilidade

(necessário token do profissional)

POST /disponibilidades

{
  "profissional_id": 1,
  "dia_da_semana": 1,
  "hora_inicio": "08:00",
  "hora_fim": "12:00"
}


Dias da semana

0 - Domingo
1 - Segunda
2 - Terça
3 - Quarta
4 - Quinta
5 - Sexta
6 - Sábado


Header

Authorization: Bearer TOKEN

Agendar consulta

(necessário token do paciente)

POST /consultas

{
  "profissional_id": 1,
  "data": "2026-01-22",
  "hora": "09:00"
}


Header

Authorization: Bearer TOKEN

Listar consultas do paciente

(necessário token do paciente)

GET /consultas

Header

Authorization: Bearer TOKEN

Cancelar consulta

(necessário token do paciente)

DELETE /consultas/:id

Header

Authorization: Bearer TOKEN
