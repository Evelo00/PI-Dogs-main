require('dotenv').config();
const { API_KEY } = process.env
const { Dog, Temperaments } = require('../db.js');
const { Router } = require("express")
const { getAllDogs } = require('../controllers/dogs');
const { default: axios } = require('axios');
const router = Router()
const url = 'https://api.thedogapi.com/v1/breeds'

router.get('/dogs/', async (req, res) => { //siempre trae entre 1 o varios perros y si no trae todos o suelta error
    try {
        const { name } = req.query;
        if (!name && Object.keys(req.query).length) throw Error('Error en la busqueda.');
        const dogs = await getAllDogs(API_KEY);
        if (!name) {
            res.status(200).json(dogs);
        }
        else {
            const dogsNames = dogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase())
            dogsNames.length ? res.status(200).json(dogsNames) :
                res.status(404).json({ error: 'No se encontró la raza' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});



router.get('/temperaments', async (req, res) => {
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

router.post('/dogs', async (req, res) => {
    let { nombre, altura, peso, anos_de_vida, imagen, temperamentos } = req.body;

    try {

        let CrearDog = await Dog.create({
            nombre,
            altura,
            peso,
            anos_de_vida,
            imagen,
            createdInDb: true
        })
        temperamentos.forEach(async e => {
            // console.log("Elemento de temp",e)
            const dogTemps = await Temperaments.findAll({
                where: { nombre: e }
            })
            //unir con la raza que recien creamos
            await CrearDog.addTemperament(dogTemps)
        })
        res.status(200).json(CrearDog);
    }
    catch (error) {
        res.status(400).json(error.message)
    }
});

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;
    const dogsTotal = await getAllDogs(id, API_KEY);
    if (id) {
        const dogsId = await dogsTotal.filter((dog) =>
            dog.id === (Number(id)));
        if (dogsId.length) {
            res.status(200).json(dogsId)
        } else {
            const findAllBD = await Dog.findAll({
                include: {
                    model: Temperaments,
                    attributes: ['nombre'],
                    through: {
                        attributes: [],
                    },
                }
            });
            if (findAllBD.length) {
                const dogsIdBD = await findAllBD.filter((dog) =>
                    dog.id.toLowerCase() === id.toLowerCase());
                dogsIdBD.length ? res.status(200).json(dogsIdBD) :
                    res.status(404).json({ error: 'No se encontró la raza' });
            }
        }
    } else {
        res.status(404).json({ error: 'No se encontró la raza' });
    }
});


module.exports = router;
