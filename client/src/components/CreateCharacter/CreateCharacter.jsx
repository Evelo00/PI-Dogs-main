import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postCharacter  } from '../../actions'
// import './CreateCharacter.css'


function validate(input) { // funcion para validar los inputs del form
    let errors = {}
    if (!input.nombre) {
        errors.nombre = 'Name is required'
    } else if (!input.altura.trim()) {
        errors.altura = 'Height is required'
    } else if (!input.peso) {
        errors.peso = 'Weight is required'
    } else if (!input.anos_de_vida) {
        errors.anos_de_vida = 'Life span is required'
    } else if (!input.imagen) {
        errors.imagen = 'Image is required'
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
        peso: '',
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

    function handleSelect(e) { // funcion para manejar los cambios en los select del form
        setInput({
            ...input,
            temperamentos: [...input.temperamentos, e.target.value]
        })
    }

    function handleSubmit(e) { // funcion para manejar el submit del form
        e.preventDefault()
        dispatch(postCharacter(input))
        alert('Dog Created!!')
        setInput({
            nombre: '',
            altura: '',
            peso: '',
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
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.nombre}
                        name="nombre"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.nombre && ( // si hay errores los muestro
                        <p>{errors.nombre}</p>
                    )}
                </div>
                <div>
                    <label>Altura:</label>
                    <input
                        type="text"
                        value={input.altura}
                        name="altura"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.altura && (
                        <p>{errors.altura}</p>
                    )}
                </div>
                <div>
                    <label>Peso:</label>
                    <input
                        type="text"
                        value={input.peso}
                        name="peso"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.peso && (
                        <p>{errors.peso}</p>
                    )}
                </div>
                <div>
                    <label>Años de vida:</label>
                    <input
                        type="text"
                        value={input.anos_de_vida}
                        name="anos_de_vida"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.anos_de_vida && (
                        <p>{errors.anos_de_vida}</p>
                    )}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type="text"
                        value={input.imagen}
                        name="imagen"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.imagen && (
                        <p>{errors.imagen}</p>
                    )}
                </div>
                <label>Temperamentos:</label>
                <select onChange={(e) => handleSelect(e)}>
                    <option key="temperaments" value="temperaments">Temperamentos</option>
                    {temperaments.map((t) => (
                        <option key={t.id} value={t.nombre}>{t.nombre}</option>
                    ))}
                </select>
                <ul><li>{input.temperamentos.map((t => t + ' ,'))}</li></ul>

                <button type="submit">Create Dog</button>
            </form>
                {input && input.temperamentos.map((t) => (
                    <div>
                        <p>{t}</p>
                        <button onClick={() => handleDelete(t)}>X</button>
                    </div>
                ))}
        </div>
    )
}
