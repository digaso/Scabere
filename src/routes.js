const { Router } = require("express");
const routes = Router();
const UsersController = require("./controllers/UsersController");
const express = require("express");

routes.put("/users/:id", (request, response) => {
  console.log(request.params);
  return response.json(request.params);
});

routes.get("/users", UsersController.index);
routes.post("/users", UsersController.store);

module.exports = routes;
