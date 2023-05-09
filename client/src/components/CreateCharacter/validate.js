export default function validate(input) {
    let errors = {}
    if (!input.nombre) {
        errors.nombre = 'Name is required'
    } else if (!/^[a-zA-Z\s]*$/.test(input.nombre)) {
        errors.nombre = 'Name is invalid'
    }
    if (!input.altura) {
        errors.altura = 'Height is required'
    } else if (!/^[0-9]*$/.test(input.altura)) {
        errors.altura = 'Height is invalid'
    }
    if (!input.alturaMin) {
        errors.alturaMin = 'Min height is required'
    } else if (!/^[0-9]*$/.test(input.alturaMin)) {
        errors.alturaMin = 'Min height is invalid'
    }
    // altura maxima no puede ser mayor a la altura minima, realizar la validacion
    if (!input.alturaMax) {
        errors.alturaMax = 'Max height is required'
    } else if (!/^[0-9]*$/.test(input.alturaMax)) {
        errors.alturaMax = 'Max height is invalid'
    }
    if (!input.peso) {
        errors.peso = 'Weight is required'
    } else if (!/^[0-9]*$/.test(input.peso)) {
        errors.peso = 'Weight is invalid'
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