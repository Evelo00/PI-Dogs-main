require('dotenv').config();
const { API_KEY } = process.env
const { Dog, Temperaments } = require('../db.js');
const { Router } = require("express")
const { getAllDogs } = require('../controllers/dogs');
const { default: axios } = require('axios');
const router = Router()
const url = 'https://api.thedogapi.com/v1/breeds'
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
        const dogs = await getAllDogs(API_KEY)

        const temperaments = []

        for (let dog of dogs) {
            if (dog.temperament) {
                const tempArray = dog.temperament.split(',')
                tempArray.forEach(temperament => temperaments.push(temperament.trim()))
            }
        };
        const temperamentsUnics = new Set(temperaments)
        const temperamentsFinal = []
        for (let temperament of temperamentsUnics) {
            const tempsAdded = await Temperaments.create({ nombre: temperament });
            temperamentsFinal.push(tempsAdded)
        };
        res.status(200).json(temperamentsFinal);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
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
