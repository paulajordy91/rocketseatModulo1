const express = require("express");

//chamando a aplicacao express
const server = express();

//plugin dentro do express para interpretar dados em formato json
// no corpo da nossa requisicao
server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { | }

//CRUD - Create, Read, Update, Delete

const users = ["Bruna", "Paula", "Jordy"];

//listar todos
server.get("/users", (req, res) => {
  return res.json(users);
});

//localhost:3000/users/index
//listar 1
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  //localhost:3000/teste?id=Paula
  return res.json(users[index]);
});

//inserir
server.post("/users", (req, res) => {
  const { name } = req.body;

  //metodo push insere um valor no array
  users.push(name);

  return res.json(users);
});

//editar
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//deletar
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  //metodo splice retira um valor no array
  users.splice(index, 1);

  return res.json(users);
  //return res.send();
});

////////////////Desafio 1

const projects = [
  {
    id: "1",
    title: "Novo Projeto",
    task: ["Nova Tarefa"]
  }
];

//middlewar global
//deve estar antes de todas as requisicoes
server.use((req, res, next) => {
  //console.count('Request');
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  next();

  console.count("Request");
});

//listar projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//listar projeto
server.get("/projects/:index", (req, res) => {
  const { index } = req.params;

  //localhost:3000/teste?id=Paula
  return res.json(projects[index]);
});

//inserir projeto
server.post("/projects", checkIDExist, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { task } = req.body;

  const prj = {
    id: id,
    title: title,
    task: task
  };

  //metodo push insere um valor no array
  projects.push(prj);

  return res.json(projects);
});

//editar
server.put("/projects/:index", checkIDExist, (req, res) => {
  const { index } = req.params;
  const { id } = req.body;
  const { title } = req.body;
  const { task } = req.body;

  const prj = {
    id: id,
    title: title,
    task: task
  };

  projects[index] = prj;

  return res.json(projects);
});

//deletar
server.delete("/projects/:index", (req, res) => {
  const { index } = req.params;

  //metodo splice retira um valor no array
  projects.splice(index, 1);

  return res.json(projects);
  //return res.send();
});

//middlewar local
function checkIDExist(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({ error: "Id nao encontrado" });
  }
  return next();
}

//porta de escuta do servidor
server.listen(3000);
