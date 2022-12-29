import express from 'express';
import { faker } from '@faker-js/faker';
faker.locale = 'es'

const routerApiTest = express.Router();

let id = 1
function getNextId() {
    return id++
}

function crearCombinacionAlAzar(id) {
    return {
        id,
        title: faker.commerce.product(),
        price: faker.commerce.price(0,1000),
    }
}

function generarNPersonas(cant) {
    const personas = []
    for (let i = 0; i < cant; i++) {
        personas.push(crearCombinacionAlAzar(getNextId()))
    }
    return personas
}

routerApiTest.get('/',(req,res) => {
    res.json(generarNPersonas(5))
});

// exports.routerApiTest = routerApiTest;
export{routerApiTest}