import express from 'express'
import { menu } from './menu.js';
import { orders } from './orders.js';
import { login } from './users.js';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config();

import { API_KEY } from './auth.js';

let server = express();
server.use(express.json());
let port = 8080;

let API_KEY2= process.env.API_KEY2;



server.get('/', (request, response) => {
    response.send('I am working');
})


server.get('/menu', (request, response) => {
    response.json(menu);
})


server.get('/orders/all', (request, response) => {
    let key = request.header('authorization');
    if (key == API_KEY) {
        response.json(orders);
    } else {
        response.status(401).send("wrong API key")
    }
});

server.get('/orders',(request,response)=>{
    let key = request.header('authorization');
    console.log(key);
    let data = jwt.verify(key.slice(7),process.env.JWT_SECRET);
    console.log(data);

    if(data){
        let userId = data.id;
        response.json(orders.filter(order=>order.userId == userId))
    }else{
        response.status(401).send('bad auth');
    }

    response.send('ok');
})

server.post('/orders',(request,response)=>{
    let key = request.header('authorization');
    console.log(key);
    let data = jwt.verify(key.slice(7),process.env.JWT_SECRET);
    console.log(data);

    if(data){
        let userId = data.id;
        orders.push({
            userId: userId,
            food: request.body.food,
            id: Math.floor(10000 *Math.random()),
        })
    }else{
        response.status(401).send('bad auth');
    }

    response.send('ok');
})

// server.get('/orders2', (request, response) => {
//     console.log(`API_KEY2 = ${API_KEY2}`);
//     let key = request.header('authorization');
//     if (key == API_KEY2) {
//         response.json(orders);
//     } else {
//         response.status(401).send("wrong API key")
//     }
// });

server.post('/users/login',(request,response)=>{
    let jwtKey = login(request.body.username, request.body.password);

    if(jwtKey){
        response.json({jwtKey})
    }else{
        response.status(404).send('bad auth');
    }
})

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
