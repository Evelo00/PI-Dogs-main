import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postCharacter } from '../../actions'
// import './CreateCharacter.css'


function validate(input) {
    let errors = {}
    if (!input.nombre) {
        errors.nombre = 'Name is required'
    } else if (!/^[a-zA-Z\s]*$/.test(input.nombre)) {
        errors.nombre = 'Name is invalid'
    }
    if (!input.alturaMin) {
        errors.alturaMin = 'Min height is required'
    } else if (!/^[0-9]*$/.test(input.alturaMin)) {
        errors.alturaMin = 'Min height is invalid'
    }
    if (!input.alturaMax) {
        errors.alturaMax = 'Max height is required'
    } else if (!/^[0-9]*$/.test(input.alturaMax)) {
        errors.alturaMax = 'Max height is invalid'
    }
    if (!input.pesoMin) {
        errors.pesoMin = 'Min weight is required'
    } else if (!/^[0-9]*$/.test(input.pesoMin)) {
        errors.pesoMin = 'Min weight is invalid'
    }
    if (!input.pesoMax) {
        errors.pesoMax = 'Max weight is required'
    } else if (!/^[0-9]*$/.test(input.pesoMax)) {
        errors.pesoMax = 'Max weight is invalid'
    }
    if (!input.anos_de_vida) {
        errors.anos_de_vida = 'Life span is required'
    } else if (!/^[0-9]*$/.test(input.anos_de_vida)) {
        errors.anos_de_vida = 'Life span is invalid'
    }
    if (!input.imagen) {
        errors.imagen = 'Image is required'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.imagen)) {
        errors.imagen = 'Image is invalid'
    }
    return errors
}

export default function CreateCharacter() {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({}) // estado para los errores del form

    const [input, setInput] = useState({
        nombre: '',
        altura: '',
        alturaMin: '',
        alturaMax: '',
        peso: '',
        pesoMin: '',
        pesoMax: '',
        anos_de_vida: '',
        imagen: '',
        temperamentos: [],
    })

    function handleChange(e) { // funcion para manejar los cambios en los inputs del form 
        setInput({
            ...input,
            [e.target.name]: e.target.value, // es dinamico y se adapta al lugar donde este seteado el name
        })
        setErrors(validate({ // seteo los errores en el estado
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    // un forEach para recorrer los temperamentos y un map para mostrarlos en el selects

    // crear un array vacio
    function handleSelect(e) { // funcion para manejar los cambios en los select del form
        const select = e.target;
        let optionSelect;
        const newTemp = [];
        console.log({
            evento: select.options,
            options: select.options[select.selectedIndex],
            value: select.options[select.selectedIndex].value,
        })
        // Array.from(select.options).forEach((option) => {
        //     if (option.selected) {
        //         optionSelect = option.value;
        //         if (!newTemp.includes(optionSelect)) {
        //             newTemp.push(optionSelect)
        //         }
        //     }
        // });
        if (!input.temperamentos.includes(e.target.value)) {
            console.log(e.target.value)
            console.log(input)
            setInput((prevState) => ({
                ...prevState,
                temperamentos: [...prevState.temperamentos, e.target.value],
            }));
        }
    }

    function handleSubmit(e) { // funcion para manejar el submit del form
        e.preventDefault()
        dispatch(postCharacter(input))
        console.log(input)
        alert('Dog Created!!')
        setInput({
            nombre: '',
            altura: '',
            alturaMin: '',
            alturaMax: '',
            peso: '',
            pesoMin: '',
            pesoMax: '',
            anos_de_vida: '',
            imagen: '',
            temperamentos: [],
        })
        history.push('/home')
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperamentos: input.temperamentos.filter(t => t !== el)
        })
    }


    return (
        <div>
            <Link to='/home'> <button>Go Home</button> </Link>
            <h1>Create your Dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={input.nombre}
                        name="nombre"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.nombre && ( // si hay errores los muestro
                        <p>{errors.nombre}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="altura">Altura de tu mascota:</label>
                    <input
                        type="number"
                        id="altura"
                        value={input.altura}
                        name="altura"
                        onChange={(e) => handleChange(e)}
                        min="0"
                        max="100"
                        required
                    />
                    {errors.altura && (
                        <p>{errors.altura}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="alturaMin">Altura minima:</label>
                    <input
                        type="number"
                        id="alturaMix"
                        value={input.alturaMin}
                        name="alturaMin"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                    {errors.altura && (
                        <p>{errors.altura}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="alturaMax">Altura maxima:</label>
                    <input
                        type="number"
                        id="alturaMax"
                        value={input.alturaMax}
                        name="alturaMax"
                        onChange={(e) => handleChange(e)}
                        min="0"
                        max="100"
                        required
                    />
                    {errors.altura && (
                        <p>{errors.altura}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="peso">Peso de tu mascota:</label>
                    <input
                        type="number"
                        id="peso"
                        value={input.peso}
                        name="peso"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                    {errors.peso && (
                        <p>{errors.peso}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="pesoMin">Peso minimo:</label>
                    <input
                        type="number"
                        id="pesoMin"
                        value={input.pesoMin}
                        name="pesoMin"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                    {errors.peso && (
                        <p>{errors.peso}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="pesoMax">Peso maximo:</label>
                    <input
                        type="number"
                        id="pesoMax"
                        value={input.pesoMax}
                        name="pesoMax"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                    {errors.peso && (
                        <p>{errors.peso}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="anos_de_vida">Años de vida:</label>
                    <input
                        type="number"
                        id="anos_de_vida"
                        value={input.anos_de_vida}
                        name="anos_de_vida"
                        onChange={(e) => handleChange(e)}
                        min="0"
                        required
                    />
                    {errors.anos_de_vida && (
                        <p>{errors.anos_de_vida}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="imagen">Imagen:</label>
                    <input
                        type="text"
                        id="imagen"
                        value={input.imagen}
                        name="imagen"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.imagen && (
                        <p>{errors.imagen}</p>
                    )}
                </div>
                {/* // validad que si el temperamento ya esta en el array no lo agregue de nuevo y que si no esta lo agregue al array y tener en cuenta que en la base de datos los temperaments de los perros se llaman "temperamentos" y mostrarlos en una lista */}
                <label>Temperamentos:</label>
                <select multiple onChange={(e) => handleSelect(e)}>
                    {temperaments.map((t) => (
                        <option value={t.nombre}>{t.nombre}</option>
                    ))}
                </select>
                <ul>
                    {Array.isArray(input.temperamentos) && input.temperamentos.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
                {/* <ul><li>{input.temperamentos.map((t => t + ' ,'))}</li></ul> */}

                <button type="submit">Create Dog</button>
            </form>
            {input && input.temperamentos.map((t) => (
                <div>
                    <p>{t + ' ,'}</p>
                    <button onClick={() => handleDelete(t)}>X</button>
                </div>
            ))}
        </div>
    )
}
