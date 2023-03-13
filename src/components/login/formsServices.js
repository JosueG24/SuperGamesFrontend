import axios from "axios"

export const LogInService = async (values)=>{
    console.log(values)
    let errors = []
    // validar datos
    if(values.name.length <  5){
        errors.push("No ha escrito su apodo o es demasiado corto")
    }
    if(values.password.length <  5){
        errors.push("No ha escrito su contraseña o es demasiado corta")
    }
    // retornar objeto con errores
    if(errors.length > 0){
        return errors
    }
    // hacer la peticion al servidor
    try {
        const req = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/login", {userName:values.name, password:values.password}, {withCredentials:true})
        console.log(req)
    } catch (error) {
        errors.push("ha ocurrido un error inesperado")
        return errors
    }
}

export const SingUpService = async (values)=>{
    console.log(values)
    let errors = []
    // validar datos
    if(values.name.length <  5){
        errors.push("No ha escrito su apodo o es demasiado corto")
    }
    if(values.password.length <  5){
        errors.push("No ha escrito su contraseña o es demasiado corta")
    }
    const expEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!expEmail.test(values.email)){
        errors.push("No ha escrito su correo o el formato de este es incorrecto")
    }
    // retornar objeto con errores
    if(errors.length > 0){
        return errors
    }
    // hacer la peticion al servidor
    try {
        const req = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/newUser", {userName:values.name, password:values.password, email:values.email}, {withCredentials:true})
        console.log(req)
    } catch (error) {
        errors.push("ha ocurrido un error inesperado")
        return errors
    }
}

export const guestService = async ()=>{
    try {
        const req = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/login/guest", {}, {withCredentials:true})
        console.log(req)
    } catch (error) {
        return "ha ocurrido un error inesperado"
    }
}