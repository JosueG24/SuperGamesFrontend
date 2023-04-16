import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/router'
import { LogInService, SingUpService, guestService } from "@/components/login/formsServices"

export default function Login() {

  const router = useRouter()
  const [mode, setMode] = useState(1)
  const [modal, setModal] = useState(false)

  async function ImGuest(){
    const result = await guestService()
    if(result == true){
      // operar que se inicio secion
      setModal({message:"Se ha iniciado sesión correctamente", errors:[], type:"ok"})  
      return
    }
    //operar que hay errores con el objeto result
    setModal({message:"han ocurrido algunos errores", errors:[result], type:"error"})
  }
  async function handleLogIn(e){
    e.preventDefault()
    const name = e.target.name.value.toLowerCase().trim()
    const password = e.target.password.value.toLowerCase().trim()
    const result = await LogInService({name, password})
    if(result == true){
      // operar que se inicio secion
      setModal({message:"Se ha iniciado sesión correctamente", errors:[], type:"ok"})  
      return
    }
    //operar que hay errores con el objeto result
    setModal({message:"han ocurrido algunos errores", errors:result, type:"error"})
  }
  async function handleSingUp(e){
    e.preventDefault()
    const name = e.target.name.value.toLowerCase().trim()
    const password = e.target.password.value.toLowerCase().trim()
    const email = e.target.email.value.toLowerCase().trim()
    const result = await SingUpService({name, password, email})
    if(result == true){
      // operar que se inicio secion
      setModal({message:"Se ha iniciado sesión correctamente", errors:[], type:"ok"})  
      return
    }
    //operar que hay errores con el objeto result
    setModal({message:"han ocurrido algunos errores", errors:result, type:"error"})
  }

  if(mode == 1)
    return(
    <Layout route="login">
      <section className="w-screen h-screen flexAllCenter txtMd">
        <div className="w-2/3 h-5/6 flexAllCenter flex-col">
          <div className="w-full h-1/7 flexAllCenter">
            <h1 className="txtXl2 txtSecondary">Bienvenido a Super Games</h1>
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
      {modal !== false &&
      <div className="top-0 right-0 fixed flexAllCenter w-screen h-screen">
        <div className={modal.type == "error"? "bg-c_GrayBlue margins outline-c_Pink w-2/4 h-1/2 flexAllCenter flex-col":"bg-c_GrayBlue margins w-2/4 h-1/2 flexAllCenter flex-col"}>
          <p className="txtLg txtSecondary py-5 text-center">{modal.message}</p>
          {modal.errors.map((item, index)=>{return(
              <p className="txtMd pb-3" key={index}> - {item}</p>
            )})}
          <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins" onClick={modal.type == "error"?()=>setModal(false):()=> router.push('/')}>Cerrar</button>
        </div>
      </div>
      }
    </Layout>
  )
  if(mode == 2)
    return (
      <Layout route="login">
      <section className="w-screen h-screen flexAllCenter txtMd">
        <div className="w-2/3 h-5/6 flexAllCenter flex-col">
          <div className="w-full h-1/7 flexAllCenter">
            <h1 className="txtXl2 txtSecondary">Bienvenido a Super Games</h1>
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
      {modal !== false &&
      <div className="top-0 right-0 fixed flexAllCenter w-screen h-screen">
        <div className={modal.type == "error"? "bg-c_GrayBlue margins outline-c_Pink w-2/4 h-1/2 flexAllCenter flex-col":"bg-c_GrayBlue margins w-2/4 h-1/2 flexAllCenter flex-col"}>
          <p className="txtLg txtSecondary py-5 text-center">{modal.message}</p>
          {modal.errors.map((item, index)=>{return(
              <p className="txtMd pb-3" key={index}> - {item}</p>
            )})}
          <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins" onClick={modal.type == "error"?()=>setModal(false):()=>router.push('/login')}>Cerrar</button>
        </div>
      </div>
      }
    </Layout>
  )
}
