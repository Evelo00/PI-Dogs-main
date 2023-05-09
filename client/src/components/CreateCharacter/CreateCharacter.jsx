import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postCharacter } from '../../actions'
import './CreateCharacter.css'
import validate from './validate'


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
        if (!input.temperamentos.includes(e.target.value)) {  // si el array no incluye el valor del select lo pushea al array
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
        history.push('/home') // redirecciono al home despues de crear el personaje
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperamentos: input.temperamentos.filter(t => t !== el) // filtro el array de temperamentos y me quedo con los que no sean el que quiero borrar
        })
    }


    return (
        <div className='all-cc'>
            <h1 className='h1-cc' >Create your Dog</h1>
            <Link to='/home'> <button className='button-cc'>Go Home</button> </Link>
            <form onSubmit={(e) => handleSubmit(e)} className='form-cc'>
                <div className='container-cc div-cc'>
                    <label htmlFor="nombre" className='label-cc'>Nombre:</label>
                    {errors.nombre && (
                        <div>
                            <span>
                                <i title={errors.nombre}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="text"
                        id="nombre"
                        value={input.nombre}
                        name="nombre"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                </div>
                <div className='container-cc'>
                    <label htmlFor="altura" className='label-cc'>Altura de tu mascota:</label>
                    {errors.altura && (
                        <div>
                            <span class="input-group-text">
                                <i title={errors.altura}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="number"
                        id="altura"
                        value={input.altura}
                        name="altura"
                        onChange={(e) => handleChange(e)}
                        min="0"
                        max="100"
                        required
                    />
                </div>
                <div className='container-cc'>
                    <label htmlFor="alturaMin" className='label-cc'>Altura minima:</label>
                    {errors.alturaMin && (
                        <div>
                            <span>
                                <i title={errors.alturaMin}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="number"
                        id="alturaMix"
                        value={input.alturaMin}
                        name="alturaMin"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                </div>
                <div className='container-cc'>
                    <label htmlFor="alturaMax" className='label-cc'>Altura maxima:</label>
                    {errors.alturaMax && (
                        <div>
                            <span>
                                <i title={errors.alturaMax}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="number"
                        id="alturaMax"
                        value={input.alturaMax}
                        name="alturaMax"
                        onChange={(e) => handleChange(e)}
                        min="0"
                        max="100"
                        required
                    />
                </div>
                <div className='container-cc'>
                    <label htmlFor="peso" className='label-cc'>Peso de tu mascota:</label>
                    {errors.peso && (
                        <div >
                            <span>
                                <i title={errors.peso}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="number"
                        id="peso"
                        value={input.peso}
                        name="peso"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                </div>
                <div className='container-cc'>
                    <label htmlFor="pesoMin" className='label-cc'>Peso minimo:</label>
                    {errors.pesoMin && (
                        <div >
                            <span>
                                <i title={errors.pesoMin}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="number"
                        id="pesoMin"
                        value={input.pesoMin}
                        name="pesoMin"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                </div>
                <div className='container-cc'>
                    <label htmlFor="pesoMax" className='label-cc'>Peso maximo:</label>
                    {errors.pesoMax && (
                        <div>
                            <span>
                                <i title={errors.pesoMax}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="number"
                        id="pesoMax"
                        value={input.pesoMax}
                        name="pesoMax"
                        onChange={(e) => handleChange(e)}
                        min="0"
                    />
                </div>

                <div className='container-cc'>
                    <label htmlFor="anos_de_vida" className='label-cc'>Años de vida:</label>
                    {errors.anos_de_vida && (
                        <div>
                            <span>
                                <i title={errors.anos_de_vida}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="number"
                        id="anos_de_vida"
                        value={input.anos_de_vida}
                        name="anos_de_vida"
                        onChange={(e) => handleChange(e)}
                        min="0"
                        required
                    />
                </div>
                <div className='container-cc '>
                    <label htmlFor="imagen" className='label-cc'>Imagen:</label>
                    {errors.imagen && (
                        <div>
                            <span>
                                <i title={errors.imagen}>❗❗</i>
                            </span>
                        </div>
                    )}
                    <input className='input-cc'
                        type="text"
                        id="imagen"
                        value={input.imagen}
                        name="imagen"
                        onChange={(e) => handleChange(e)}
                        required
                    />

                </div>

                <label className='label-cc'>Temperamentos:</label>
                <select multiple onChange={(e) => handleSelect(e)} className='select-cc'>
                    {temperaments.map((t) => (
                        <option value={t.nombre}>{t.nombre}</option>
                    ))}
                </select>
                <ul className='ul-cc'>
                    {Array.isArray(input.temperamentos) && input.temperamentos.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
                {/* <ul><li>{input.temperamentos.map((t => t + ' ,'))}</li></ul> */}

                <button type="submit" className='submit-cc'>Create Dog</button>
            </form>
            <div className='container-cc'>
                {input && input.temperamentos.map((t) => (
                    <div key={t} className='box-cc'>
                        <p className='boxp-cc'>{t}</p>
                        <button onClick={() => handleDelete(t)} className='boxbtn-cc' style={{ verticalAlign: 'middle' }}>X</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
