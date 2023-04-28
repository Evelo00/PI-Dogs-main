const axios = require('axios');
const { Dog, Temperaments} = require('../db.js');


//creamos la variable url para no repetir el link de la api
const url = 'https://api.thedogapi.com/v1/breeds'

// 📍 GET | /dogs
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

const getApiInfo = async (API_KEY) => {
    try {
        const dogs = await axios.get(`${url}?api_key=${API_KEY}`);
        
        // mapeamos los datos de la api para que queden como los necesitamos
        const dataDog = dogs.data.map((dog) => ({
            id: dog.id,
            name: dog.name,
            altura: dog.height.metric,
            peso: dog.weight.metric,
            anos_de_vida: dog.life_span,
            imagen: dog.image,
            temperament: dog.temperament
        }));
        return dataDog;
    } catch (error) {
        throw new Error(`No se pudo obtener la información de la API: ${error.message}`);
    }
}


const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ['nombre'],
        },
    });
};


const getAllDogs = async (API_KEY) => {
    const apiInfo = await getApiInfo(API_KEY);
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

module.exports = {
    getAllDogs,
};
