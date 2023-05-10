const { Router } = require("express");
const { API_KEY } = process.env;
const { getAllDogs } = require('../controllers/dogs');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const dogs = await getAllDogs(API_KEY);
        if (name) {
            const dogsNames = dogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());
            if (dogsNames.length > 0) {
                res.status(200).json(dogsNames);
            } else {
                res.status(404).json({ error: 'No se encontró la raza' });
            }
        } else {
            res.status(200).json(dogs);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;