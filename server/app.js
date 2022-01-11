const express = require('express');
const path = require('path');
const sequelize = require("./config/database");
const Publication = require('./models/Publication');

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

const app = express();

// CORS configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

const userRoutes = require('./routes/user.routes');

app.use("/api/auth", userRoutes);

const publicationRoutes = require('./routes/publication.routes');
app.use("/api/publications", publicationRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;