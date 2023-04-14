import Layout from "@/components/layout/Layout"
import { useRouter } from "next/router"
import { useState } from "react"
import  emailjs from "@emailjs/browser";

export default function support() {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  function handleSubmit(e){
    let errors  = {title:"", description:[]}
    let expEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    let form = document.querySelector("#contactForm")
    let iName = document.querySelector("#iName")
    let iEmail = document.querySelector("#iEmail")
    let iMessage = document.querySelector("#iText")
    e.preventDefault()
    // area de resets
    setModal(false);
    iName.classList.remove("errorCamp")
    iEmail.classList.remove("errorCamp")
    iMessage.classList.remove("errorCamp")
    // area de validaciones
    if(iName.value.length < 2){
        iName.classList.add("errorCamp")
        errors = {title:"Has cometido algunos errores", description:[...errors.description, "El valor del nombre es incorrecto"]}
    }
    if(!expEmail.test(iEmail.value)){
        iEmail.classList.add("errorCamp")
        errors = {title:"Has cometido algunos errores", description:[...errors.description, "El correo ingresado es incorrecto"]}
    }
    if(iMessage.value.length <1){
        iMessage.classList.add("errorCamp")
        errors = {title:"Has cometido algunos errores", description:[...errors.description, "El mensaje está vacío"]}
    }        
    
    if(errors.title !== "") setModal(errors)

    // area de datos exitosos
    if(errors.title === ""){
      emailjs.sendForm("service_iz65pwb","template_8ek38p2",e.target, "BHROj7NfKxy3Xa0ja")
      .then(res =>{
        form.reset()
        setModal({title:"Perfecto", description:["Su mensaje se ha enviado correctamente"]})
      })
      .catch(error=>{
        setModal({title:"Error", description:["Lo sentimos, su mensage no se ha enviado por errores desconocidos."]})
      })
    }
    
  }

  return (
    <Layout route="public">
      <section className="w-screen h-screen flex txtThird">
        <div className="w-2/3 h-full border-r-4 border-c_GrayBlue">
          <header className="bg-c_GrayBlue w-full h-1/7 flexAllCenter justify-start">
            <p className="txtXl ml-[calc(15%)] txtSecondary"> Soporte</p>
          </header>
          <div className="p-4 overflow-y-auto">
            <p className="p-3">Fast Refresh had to perform a full reload when ./src/pages/support/index.js changed. Read more: https://nextjs.org/docs/messages/fast-refresh-reload Fast Refresh had to perform a full reload when ./src/pages/support/index.js changed. Read more: https://nextjs.org/docs/messages/fast-refresh-reload Fast Refresh had to perform a full reload when ./src/pages/support/index.js changed. Read more: https://nextjs.org/docs/messages/fast-refresh-reload</p>

          </div>
        <button onClick={() =>router.back()}>return</button>

        </div>
        <div className="w-1/3 h-full flexAllCenter flex-col">
          <p className="txtLg w-full h-1/7 flexAllCenter txtPrincipal">Formulario de contacto</p>
          <p className="txtMd w-full h-1/7 flexAllCenter text-center px-1">Para contactar con el desarrollador, utiliza nuestro formulario y cuéntanos sobre tus necesidades. ¡Estaré encantado de ayudarte!</p>
          
          <form id="contactForm" className='flexAllCenter w-full h-5/7 flex-col txtLg' onSubmit={handleSubmit}>
          <div className="flexAllCenter flex-col w-full h-2/10">
            <div className='w-5/6 h-full rounded-lg p-1 flexAllCenter'>
              <input id="iName" type="text" name="name" placeholder="Ingrese su Nombre" className="h-full w-full rounded-lg bg-c_LightGrayBlue border-b-2 border-c_White focus:outline-none focus:border-c_Pink text-center"/>
            </div>
            <div className='w-5/6 h-full rounded-lg p-1 flexAllCenter'>
              <input id="iEmail" type="text" name="email" placeholder="Ingrese su Correo" className="h-full w-full rounded-lg bg-c_LightGrayBlue border-b-2 border-c_White focus:outline-none focus:border-c_Pink text-center"/>
            </div>
          </div>
          <div className=' w-5/6 h-5/7 rounded-lg p-2'>
            <textarea id="iText" type="text" name="message" className="placeholder:text-c_LightGrayBlue border-y-2 border-c_White rounded-lg bg-c_LightGrayBlue w-full h-full focus:outline-none focus:border-c_Pink p-2" placeholder="Escriba su mensage"></textarea>
          </div>
          <div className="flexAllCenter w-1/3 h-auto"><button className="border-y-2 border-c_White bg-c_LightGrayBlue w-full h-full py-1 rounded-lg hover:border-c_Pink transition-colors txtPrincipal">Enviar</button></div>
        </form>
        </div>
      </section>

      {modal !== false &&
      <div className="bg-c_Opaque fixed w-screen h-screen top-0 left-0 z-10 flexAllCenter txtThird">
        <div className="bg-c_GrayBlue w-1/3 h-1/3 rounded-lg border-y-2 border-c_White flexAllCenter  flex-col p-3">
          <p className="pb-2 txtPrincipal txtLg">{modal.title}</p>
          {modal.description.map((item, index)=>{
            return(
              <p className="pb-2 text-center" key={index}>- {item}</p>
            )
          })}
          <button className="px-3 py-2 rounded-md bg-c_DarckBlue hover:bg-c_LightGrayBlue transition-colors" onClick={()=>setModal(false)}>Cerrar</button>
        </div>
      </div>
    }
    </Layout>
  )
}
