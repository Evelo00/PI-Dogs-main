require('dotenv').config();
const { API_KEY } = process.env
const { Router } = require("express")
const { getDogs, getDogsByRazaId, getDogsName, getTemperaments } = require('../controllers/dogs')
const router = Router()
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs/', async (req, res) => {
    try {
        const { name } = req.query;
        console.log(name)
        if(name) {
            const dogs = await getDogsName(name, API_KEY);
            res.status(200).json(dogs);
        }
        else{
            const dogs = await getDogs(name, API_KEY);
            res.status(200).json(dogs);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/dogs/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params;
        const dogs = await getDogsByRazaId(idRaza, API_KEY);
        res.status(200).json(dogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/temperaments', async (req, res) => {
    try {   
        const temperaments = await getTemperaments(API_KEY);
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


getDogs.use = ('/dogs', router)



module.exports = router;
