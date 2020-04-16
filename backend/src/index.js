const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require("dotenv/config");

//app.use(cors);
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Conectei-me oh meu grande rei")
);
app.use(express.json());
app.use(routes);
app.listen(3333);
