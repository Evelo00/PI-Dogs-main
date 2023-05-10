require('dotenv').config();
const { API_KEY } = process.env
const { Temperaments } = require('../db.js');
const { Router } = require("express")
const { getAllDogs } = require('../controllers/dogs');
const router = Router()



router.get('/', async (req, res) => {
    try {
        const dogs = await getAllDogs(API_KEY) // traigo todos los perros de la api

        const temperaments = [] // creo un array vacio para guardar los temperamentos

        for (let dog of dogs) { // recorro los perros
            if (dog.temperament) {
                const tempArray = dog.temperament.split(',') // separo los temperamentos por comas
                tempArray.forEach(temperament => temperaments.push(temperament.trim())) // trim() elimina los espacios en blanco
            }
        };
        const temperamentsUnics = new Set(temperaments) // elimino los repetidos
        const temperamentsFinal = [] // creo un array vacio para guardar los temperamentos finales
        for (let temperament of temperamentsUnics) {
            const tempsAdded = await Temperaments.create({ nombre: temperament }); // creo los temperamentos en la base de datos
            temperamentsFinal.push(tempsAdded) // los agrego al array final
        };
        res.status(200).json(temperamentsFinal); // muestro los temperamentos finales
    } catch (error) {
        res.status(500).send('Error interno del servidor'); // si hay un error muestro un mensaje
    }
});


module.exports = router;