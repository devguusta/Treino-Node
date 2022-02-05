const express= require('express');
const  {User} = require('./src/models');

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.send("Hello World");
});

const db = require("./src/models");
db.sequelize.sync();

app.listen(3000);