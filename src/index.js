const port = 3333
const cors = require('cors');
const routes = require('./routes');
const express = require('express');
const { errors } = require('celebrate');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errors());

function status(port) {
    console.log(`\nAplicação rodando da porta ${port}`)
}

app.listen(port, status(port));