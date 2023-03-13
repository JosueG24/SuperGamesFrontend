import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import { LogInService, SingUpService, guestService } from "@/components/login/formsServices"

export default function Login() {

  const [mode, setMode] = useState(1)

  async function ImGuest(){
    const result = await guestService()
    if(result == true){
      // operar que se inicio secion
    }
    //operar que hay errores con el objeto result
    console.log(result)
    
    // apuntes :
    // validaciones bien, hay que crear el mensaje de advertencia si existen errores
    // el sevidor responde con codigo 200 a /login/guest pero no establece la cookie
  }
  async function handleLogIn(e){
    e.preventDefault()
    const name = e.target.name.value.toLowerCase().trim()
    const password = e.target.password.value.toLowerCase().trim()
    const result = await LogInService({name, password})
    if(result == true){
      // operar que se inicio secion
    }
    //operar que hay errores con el objeto result
    console.log(result)
  }
  async function handleSingUp(e){
    e.preventDefault()
    const name = e.target.name.value.toLowerCase().trim()
    const password = e.target.password.value.toLowerCase().trim()
    const email = e.target.email.value.toLowerCase().trim()
    const result = await SingUpService({name, password, email})
    if(result == true){
      // operar que se inicio secion
    }
    //operar que hay errores con el objeto result
    console.log(result)
  }

  if(mode == 1)
    return(
    <Layout route="login">
      <section className="w-screen h-screen flexAllCenter txtMd">
        <div className="w-2/3 h-5/6 flexAllCenter flex-col">
          <div className="w-full h-1/7 flexAllCenter">
            <h1 className="txtXl2 txtSecondary">Bienvenido a super Kimis</h1>
          </div>
          <div className="bg-c_GrayBlue w-5/6 h-5/7 rounded-md flexAllCenter flex-col">

          <p className=" txtLg w-full h-1/7 flexAllCenter">Bienvenido de nuevo</p>
            <form className="w-1/2 h-5/7 flexAllCenter flex-col" onSubmit={handleLogIn}>
              <input type="text" name="name" className="w-3/4 rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='apodo'/>
              <input type="text" name="password" className="w-3/4 rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='contraseña'/>
              <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins">Enviar</button>
            </form>

          </div>
          <div className="w-full h-2/7 flexAllCenter flex-col justify-around">
            <button className="bg-c_LightGrayBlue w-1/6 h-1/3  rounded-lg transition-all hover:font-bold hover:bg-c_DarckBlue hover:margins" onClick={ImGuest}>Invitado</button>
            <div className="flexAllCenter flex-col">
              <p className="">No tienes una cuenta?</p>
              <button className="text-c_Pink hover:font-bold hover:text-white transition-all" onClick={()=>setMode(2)}>Crear cuenta</button>
            </div>
          </div>
        </div>
        <Link  className="bg-c_GrayBlue fixed rounded-full w-10 h-10 bottom-5 left-5 flexAllCenter transition-all hover:bg-c_Pink" href={"/support"}>?</Link>
      </section>
    </Layout>
  )
  if(mode == 2)
    return (
      <Layout route="login">
      <section className="w-screen h-screen flexAllCenter txtMd">
        <div className="w-2/3 h-5/6 flexAllCenter flex-col">
          <div className="w-full h-1/7 flexAllCenter">
            <h1 className="txtXl2 txtSecondary">Bienvenido a super Kimis</h1>
          </div>
          <div className="bg-c_GrayBlue w-5/6 h-5/7 rounded-md flexAllCenter flex-col">

            <p className=" txtLg w-full h-1/7 flexAllCenter">Crear una cuenta</p>
            <form className="w-1/2 h-5/7 flexAllCenter flex-col" onSubmit={handleSingUp}>
              <input type="text" name="name" className="w-3/4 rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='apodo'/>
              <input type="text" name="password" className="w-3/4 rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='contraseña'/>
              <input type="text" name="email" className="w-3/4 rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='correo'/>
              <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins">Crear</button>
            </form>

          </div>
          <div className="w-full h-2/7 flexAllCenter flex-col justify-around">
            <button className="bg-c_LightGrayBlue w-1/6 h-1/3 rounded-lg transition-all hover:font-bold hover:bg-c_DarckBlue hover:margins" onClick={ImGuest}>Invitado</button>
            <div className="flexAllCenter flex-col">
              <p className="">Ya tienes una cuenta?</p>
              <button className="text-c_Pink hover:font-bold hover:text-white transition-all" onClick={()=>setMode(1)}>Iniciar seción</button>
            </div>
          </div>
        </div>
        <Link  className="bg-c_GrayBlue fixed rounded-full w-10 h-10 bottom-5 left-5 flexAllCenter transition-all hover:bg-c_Pink" href={"/support"}>?</Link>
      </section>
    </Layout>
  )
}
