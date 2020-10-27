const express = require("express");
const cors = require("cors");

 const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.status(200).json(repositories);
  
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    url: url,
    title: title,
    techs: techs,
    likes: 0,
  }

  console.log(repository);

  repositories.push(repository);

  return response.status(201).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs, likes} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'repository not found'})
  }

  if(likes){
    return response.status(400).json({likes: repositories[repositoryIndex].likes})
  }

  const repository = {
    id,
    url,
    title,
    techs,
  }

  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'repository not found'})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json()

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'repository not found'})
  }

  repositories[repositoryIndex].likes++;

  return response.status(200).json({likes: repositories[repositoryIndex].likes})
});

module.exports = app;
