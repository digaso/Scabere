const { Router } = require("express");
const routes = Router();

const express = require("express");

routes.put("/users/:id", (request, response) => {
  console.log(request.params);
  return response.json({ message: "ola" });
});

routes.get("/users", UsersController.index);
routes.post("/users", UsersController.store);

module.exports = routes;
