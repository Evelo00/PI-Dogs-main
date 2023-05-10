const { Router } = require('express');
const { getAllDogs } = require('../controllers/dogs');
const { Dog, Temperaments } = require('../db.js');
const router = Router();
const { API_KEY } = process.env;



router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const dogsTotal = await getAllDogs(id, API_KEY);
    if (id) {
        const dogsId = await dogsTotal.filter((dog) =>
            dog.id === (Number(id)));
        if (dogsId.length) {
            function formatoDogs(dogsId) {
                let obj = dogsId[0]
                obj.temperament = obj.temperament.split(', ').map(e => e.trim())
                return obj
            }
            const dogF = formatoDogs(dogsId)
            res.status(200).json(dogF)
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
                dogsIdBD.length ? res.status(200).json(dogsIdBD[0]) :
                    res.status(404).json({ error: 'No se encontró' });
            }
        }
    } else {
        res.status(404).json({ error: 'No se encontró ' });
    }
});


module.exports = router;

