AGENDAMENTO DE CONSULTAS
Este é um projeto de agendamento de consultas para prova final utilizando AdonisJS.

Pré-requisitos

Node.js
NPM (geralmente vem com o Node.js)
Um banco de dados PostgreSQL em execução.



Tecnologias Utilizadas

Node.js
AdonisJS
Postgres
TypeScript

INSTRUÇÔES DE EXECUÇÃO DO PROJETO

Clone o repositório
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


Rotas implementadas

Cadastrar usuários
POST /auth/register
{
  "nome": "Admin",
  "email": "admin@ifma.com",
  "password": "123456",
  "tipo": "paciente"
}


login de usuários
POST /auth/login
{
  "email": "admin@ifma.com",
  "password": "123456",
}


Cadastrar profissional
POST /auth/register
{
  "nome": "AdminPRO",
  "email": "adminPRO@ifma.com",
  "password": "123456",
  "tipo": "administrador"
}



Login do profissional
POST /auth/login
{
  "email": "admin@ifma.com",
  "password": "123456",
}



Cadastro da especialidade (Precisa do token do profissional)
POST /profissional
{
  "nome": "Dr João",
  "especialidade": "Cardiologia"
}
Authorization: Bearer TOKEN


Listar profissional (Precisa do token do profissional)
GET /profissional
Authorization: Bearer TOKEN

Cadastrar disponibilidade (Precisa do token do profissional)
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


Authorization: Bearer TOKEN

Agendar consulta (Precisa do token do paciente)
POST /consultas
{
  "profissional_id": 1,
  "data": "2026-01-22",
  "hora": "09:00"
}
Authorization: Bearer TOKEN

Listar consultas do paciente (Precisa do token do paciente)
GET /consultas

Authorization: Bearer TOKEN

Cancelar consulta (Precisa do token do paciente)
DELETE /consultas/:id

Authorization: Bearer TOKEN






