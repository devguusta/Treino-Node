const express= require('express');

const morgan = require("morgan");
const routes = require("./src/routes");
const port = require("./config.json").port;
const path = require("path");
const bodyParser = require('body-parser');

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );

app.use(routes);


const db = require("./src/models");
db.sequelize.sync();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });