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

// 📍 GET | /dogs/:idRaza

// Obtiene el detalle de una raza de perro en particular en base a su id.
// Esta ruta obtiene el detalle de una raza específica.Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro(ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

async function getDogsByRazaId(id) {
    try {
        const dogs = await axios.get(`${url}/${id}`)
            .then(response => response.data)
        const dataDog = {
            id: dogs.id,
            imagen: dogs.image,
            name: dogs.name,
            temperamentos: dogs.temperament,
            altura: dogs.height.metric,
            peso: dogs.weight.metric,
            colorFondo: dogs.bred_for,
            años_de_vida: dogs.life_span,
        };
        return dataDog;
    } catch (error) {
        throw new Error(`No se pudo obtener la información de la API: ${error.message}`);
    }
}

// GET | /dogs/name?="..."
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

async function getDogsName(name, API_KEY) {
    try {
        const dogs = await axios.get(`${url}?api_key=${API_KEY}`)
            .then(response => response.data);
        const dataDog = dogs.find((dog) => dog.name === name);
        return {
            id: dataDog.id,
            imagen: dataDog.image,
            name: dataDog.name,
            temperamentos: dataDog.temperament,
            altura: dataDog.height.metric,
            peso: dataDog.weight.metric,
            colorFondo: dataDog.bred_for,
            años_de_vida: dataDog.life_span,
        };
    } catch (error) {
        throw new Error(`No se pudo obtener la información de la API: ${error.message}`);
    }
}

// 📍 GET | /temperaments
// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API(se evaluará que no haya hardcodeo).Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

async function getTemperaments(API_KEY) {
    try {
        const dogs = await axios.get(`${url}?api_key=${API_KEY}`)
            .then(response => response.data);
        const temperaments = dogs.map((dog) => dog.temperament);
        const temperamentsArray = temperaments.map((temperament) => temperament.split(', '));
        const temperamentsFlat = temperamentsArray.flat();
        const temperamentsUnique = [...new Set(temperamentsFlat)];
        return temperamentsUnique;
    } catch (error) {
        throw new Error(`No se pudo obtener la información de la API: ${error.message}`);
    }
}

// 📍 POST | /dog
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados(al menos uno).



exports.getDogs = getDogs;
exports.getDogsByRazaId = getDogsByRazaId;
exports.getDogsName = getDogsName;
exports.getTemperaments = getTemperaments;





/*
const dog = await axios.get(`${url}/${id}`)
        .then(response => response.data))
        const dataDog = {
            id: dogs.id,
            imagen: dogs.image,
            name: dogs.name,
            altura: dogs.height.metric,
            peso: dogs.weight.metric,
            alturaMax: dogs.height.metric.split(' - ')[1],
            alturaMin: dogs.height.metric.split(' - ')[0],
            pesoMax: dogs.weight.metric.split(' - ')[1],
            pesoMin: dogs.weight.metric.split(' - ')[0],
            edadMax: dogs.life_span.split(' - ')[1],
            edadMin: dogs.life_span.split(' - ')[0],
            colorFondo: dogs.bred_for,
            años_de_vida: dogs.life_span,
        };
        return dataDog; */

/*const createActivity = async (name, difficulty, duration, season, countriesId) => { //Formato de counrtiesID: [{id: id}, {id: id}]
  try{
    const countries = []
    countriesId.find(async ({id}) => {
      if(!id) throw Error("ID can not be null")
      else {
        const country = await Country.findByPk(id)
        if(!country) throw Error(`Country id ${id} is not a valid id`)
        else{countries.push(country)}
      }
    })
    const actividad = await Activity.create({name, difficulty, duration, season})
    if(actividad) {
      countries.forEach(async (country) => {
        await country.addActivity(actividad)
        // SI TENGO UN VALOR QUE NO ESTÁ EN LA BD --> No me tira error pero country va a ser null
      });
      return actividad
    }
  }
  catch(error) {
    throw error
  }
}
data base
const getAllCountries = async () => {
    const countries = await Country.findAll()
    if(!countries) throw Error("DataBase Error")
    else return countries
}
------------------
const getCountryByPk = async (id) => {
    const country = await Country.findByPk(id, {include: Activity}) 
    if(!country) throw Error(The country id ${id} was not found) //Se buscó un id que no estaba en la db
    else return country

} */