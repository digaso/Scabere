const multer = require("multer");
const { Router } = require("express");
const routes = Router();
const UsersController = require("./controllers/UsersController");
const StatisticsController = require("./controllers/StatisticsController");
const ListsController = require("./controllers/ListsController");
const TasksController = require("./controllers/TasksController");
const multerconfig = require("./config/multer");
const checkAuth = require("./middleware/checkAuth");
const getUserLists = require("./middleware/getUserLists");

routes.get("/users", checkAuth, UsersController.index);
routes.post("/login", UsersController.login);
routes.post(
  "/users",
  multer(multerconfig).single("photo_url"),
  UsersController.store,
  StatisticsController.store
);
routes.put(
  "/users",
  checkAuth,
  multer(multerconfig).single("photo_url"),
  UsersController.update
);
routes.delete("/users", checkAuth, UsersController.destroy);

routes.get("/stats", checkAuth, StatisticsController.index);

routes.get("/lists", checkAuth, ListsController.index);
routes.delete("/lists/:id", checkAuth, ListsController.destroy);
routes.post("/lists", checkAuth, ListsController.store);

routes.get("/lists/:id/tasks", checkAuth, TasksController.listTasks);
routes.get("/tasks", checkAuth, getUserLists, TasksController.index);
routes.post("/tasks", checkAuth, TasksController.store);
routes.put("/tasks/:id", checkAuth, TasksController.update);
routes.delete("/tasks/:id", checkAuth, TasksController.destroy);
routes.post("/tasks/check/:id", checkAuth, TasksController.checkTask);

module.exports = routes;
