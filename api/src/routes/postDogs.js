
const { Router } = require('express');
const { Dog, Temperaments } = require('../db.js');
const router = Router();

router.post('/', async (req, res) => {
    let { nombre, altura, peso, anos_de_vida, imagen, temperamentos, alturaMax, alturaMin, pesoMax, pesoMin } = req.body;
    try {

        let CrearDog = await Dog.create({
            nombre,
            altura,
            peso,
            alturaMax,
            alturaMin,
            pesoMax,
            pesoMin,
            anos_de_vida,
            imagen,
            createdInDb: true
        })
        for (let e of temperamentos) {
            const dogTemps = await Temperaments.findOne({ //busco el temperamento en la base de datos y lo guardo en una variable 
                where: { nombre: e }
            })
            const perroCreado = await CrearDog.addTemperament(dogTemps)
        }
        res.status(200).json(CrearDog);
    }
    catch (error) {
        res.status(400).json(error.message)
    }
});


module.exports = router;