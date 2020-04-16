const multer = require("multer");
const { Router } = require("express");
const routes = Router();
const UsersController = require("./controllers/UsersController");
const StatisticsController = require("./controllers/StatisticsController");
const ListsController = require("./controllers/ListsController");
const TasksController = require("./controllers/TasksController");
const ProfileController = require("./controllers/ProfileController");
const multerconfig = require("./config/multer");

routes.get("/users", UsersController.index);
routes.post(
  "/users",
  multer(multerconfig).single("photo_url"),
  UsersController.store
);
routes.put(
  "/users/:username",
  multer(multerconfig).single("photo_url"),
  UsersController.update
);
routes.delete("/users/:username", UsersController.destroy);

routes.get("/profile", ProfileController.index);
routes.get("/profile/lists", ProfileController.lists);
routes.get("/profile/stats", ProfileController.stats);
routes.get("/profile/tasks", ProfileController.tasks);

routes.get("/stats", StatisticsController.index);
routes.post("/stats", StatisticsController.store);

routes.get("/lists", ListsController.index);
routes.delete("/lists/:id", ListsController.destroy);
routes.post("/lists", ListsController.store);

routes.get("/lists/:id/tasks", TasksController.listTasks);
routes.get("/tasks", TasksController.index);
routes.post("/tasks", TasksController.store);
routes.put("/tasks/:id", TasksController.update);

module.exports = routes;
