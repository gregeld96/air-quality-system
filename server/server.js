require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const ip = "localhost";
const port = 3000;
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

app.listen(port, ip, () => {
    console.log(`http://${ip}:${port}`);
})