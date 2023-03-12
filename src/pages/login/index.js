import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Login() {

  const [mode, setMode] = useState(1)

  function handleLogIn(e){
    e.preventDefault()
  }
  function handleSingUp(e){
    e.preventDefault()
  }

  if(mode == 1)
    return(
    <Layout>
      <section className="w-screen h-screen flexAllCenter txtMd">
        <div className="w-2/3 h-5/6 flexAllCenter flex-col">
          <div className="w-full h-1/7 flexAllCenter">
            <h1 className="txtXl2 txtSecondary">Bienvenido a super Kimis</h1>
          </div>
          <div className="bg-c_GrayBlue w-5/6 h-5/7 rounded-md flexAllCenter flex-col">

          <p className=" txtLg w-full h-1/7 flexAllCenter">Bienvenido de nuevo</p>
            <form className="w-1/2 h-5/7 flexAllCenter flex-col" onSubmit={handleLogIn}>
              <input type="text" name="name" className="rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='apodo'/>
              <input type="text" name="password" className="rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='contraseña'/>
              <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins">Enviar</button>
            </form>

          </div>
          <div className="w-full h-2/7 flexAllCenter flex-col justify-around">
            <button className="bg-c_LightGrayBlue w-1/6 h-1/3  rounded-lg transition-all hover:font-bold hover:bg-c_DarckBlue hover:margins">Invitado</button>
            <div className="flexAllCenter flex-col">
              <p className="">No tienes una cuenta?</p>
              <button className="text-c_Pink hover:font-bold hover:text-white transition-all" onClick={()=>setMode(2)}>Crear cuenta</button>
            </div>
          </div>
        </div>
        <button className="bg-c_GrayBlue fixed rounded-full w-10 h-10 bottom-5 left-5"><Link href={"/support"}>?</Link></button>
      </section>
    </Layout>
  )
  if(mode == 2)
    return (
      <Layout>
      <section className="w-screen h-screen flexAllCenter txtMd">
        <div className="w-2/3 h-5/6 flexAllCenter flex-col">
          <div className="w-full h-1/7 flexAllCenter">
            <h1 className="txtXl2 txtSecondary">Bienvenido a super Kimis</h1>
          </div>
          <div className="bg-c_GrayBlue w-5/6 h-5/7 rounded-md flexAllCenter flex-col">

            <p className=" txtLg w-full h-1/7 flexAllCenter">Crear una cuenta</p>
            <form className="w-1/2 h-5/7 flexAllCenter flex-col" onSubmit={handleSingUp}>
              <input type="text" name="name" className="rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='apodo'/>
              <input type="text" name="password" className="rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='contraseña'/>
              <input type="text" name="email" className="rounded-lg text-center bg-c_LightGrayBlue py-1 txtPrincipal m-4 focus:outline-none" placeholder='correo'/>
              <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins">Crear</button>
            </form>

          </div>
          <div className="w-full h-2/7 flexAllCenter flex-col justify-around">
            <button className="bg-c_LightGrayBlue w-1/6 h-1/3 rounded-lg transition-all hover:font-bold hover:bg-c_DarckBlue hover:margins">Invitado</button>
            <div className="flexAllCenter flex-col">
              <p className="">Ya tienes una cuenta?</p>
              <button className="text-c_Pink hover:font-bold hover:text-white transition-all" onClick={()=>setMode(1)}>Iniciar seción</button>
            </div>
          </div>
        </div>
        <button className="bg-c_GrayBlue fixed rounded-full w-10 h-10 bottom-5 left-5 transition-all hover:bg-c_Pink"><Link href={"/support"}>?</Link></button>
      </section>
    </Layout>
  )
}
