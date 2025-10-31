import express from 'express'
import { menu } from './menu.js';
import { orders } from './orders.js';
import { API_KEY } from './auth.js';

let server = express();
let port = 8080;

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

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
