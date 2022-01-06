const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Pass2022+test",
  database: "p7Groupomania",
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post("/signup", (req, res) => {
  const pseudo = req.body.pseudo;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (pseudo, email, password) VALUES(?,?,?)",
    [pseudo, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//const userRoutes = require('./routes/user.routes');




app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/auth', userRoutes);

module.exports = app;