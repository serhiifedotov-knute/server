import express from 'express'
import { menu } from './menu.js';
import { orders } from './orders.js';

import dotenv from 'dotenv'
dotenv.config();

import { API_KEY } from './auth.js';

let server = express();
let port = 8080;

let API_KEY2= process.env.API_KEY2;



server.get('/', (request, response) => {
    response.send('I am working');
})


server.get('/menu', (request, response) => {
    response.json(menu);
})


server.get('/orders', (request, response) => {
    let key = request.header('authorization');
    if (key == API_KEY) {
        response.json(orders);
    } else {
        response.status(401).send("wrong API key")
    }
});

server.get('/orders2', (request, response) => {
    console.log(`API_KEY2 = ${API_KEY2}`);
    let key = request.header('authorization');
    if (key == API_KEY2) {
        response.json(orders);
    } else {
        response.status(401).send("wrong API key")
    }
});

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
