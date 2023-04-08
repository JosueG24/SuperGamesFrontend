import axios from "axios"

export const LogInService = async (values)=>{
    let errors = []
    // validar datos
    if(values.name.length <  5){
        errors.push("No ha escrito su apodo o es demasiado corto")
    }
    if(values.password.length <  3){
        errors.push("No ha escrito su contraseña o es demasiado corta")
    }
    // retornar objeto con errores
    if(errors.length > 0){
        return errors
    }
    // hacer la peticion al servidor
    try {
        const req = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/login", {userName:values.name, password:values.password}, {withCredentials:true})
        if(req.status !== 200){
            errors.push("ha ocurrido un error inesperado")
            return errors
        }
        return true
    } catch (error) {
        if(error.response && error.response.status == 401){
            errors.push("usuario o contrasweña invalidos")
            return errors    
        }
        errors.push("ha ocurrido un error inesperado, quizá hayas perdido tu coneccion a internet.")
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
    if(values.password.length <  3){
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
        if(req.status !== 200){
            errors.push("ha ocurrido un error inesperado")
            return errors
        }
        return true
    } catch (error) {
        if(error.response.status == 400){
            errors.push("ha ingresado datosinvalidos, quiza el apodo o el correo ya esten siendo utilizados.")
            return errors    
        }
        errors.push("ha ocurrido un error inesperado")
        return errors
    }
}

export const guestService = async ()=>{
    try {
        const req = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/login/guest", {}, {withCredentials:true})
        if(req.status !== 200){
            return "ha ocurrido un error inesperado"
        }
        return true
        
    } catch (error) {
        return "ha ocurrido un error inesperado"
    }
}