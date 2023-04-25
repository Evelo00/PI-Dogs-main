const axios = require('axios');
// poner en cada end point la ruta de la base de datos API KEY
const Dog = require('../models/Dog');

//creamos la variable url para no repetir el link de la api
const url = 'https://api.thedogapi.com/v1/breeds'

// 📍 GET | /dogs
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

async function getDogs(API_KEY, name) {
    try {
        const dogs = await axios.get(`${url}?api_key=${API_KEY}&q=${name}`);

        // mapeamos los datos de la api para que queden como los necesitamos
        const dataDog = dogs.data.map((dog) => ({
            id: dog.id,
            imagen: dog.image,
            name: dog.name,
            altura: dog.height.metric,
            peso: dog.weight.metric,
            alturaMax: dog.height.metric.split(' - ')[1],
            alturaMin: dog.height.metric.split(' - ')[0],
            pesoMax: dog.weight.metric.split(' - ')[1],
            pesoMin: dog.weight.metric.split(' - ')[0],
            edadMax: dog.life_span.split(' - ')[1],
            edadMin: dog.life_span.split(' - ')[0],
            colorFondo: dog.bred_for,
            años_de_vida: dog.life_span,
        }));
        return dataDog;
    } catch (error) {
        throw new Error(`No se pudo obtener la información de la API: ${error.message}`);
    }
}

exports.getDogs = getDogs;

