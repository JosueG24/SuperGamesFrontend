import Layout from "@/components/layout/Layout"
import { useRouter } from "next/router"

export default function support() {
  const router = useRouter()
  function handleSubmit(e){
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <Layout route="public">
      <section className="w-screen h-screen flex">
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
          <p className="txtLg w-full h-1/7 flexAllCenter">Formulario de contacto</p>
          <p className="txtMd w-full h-1/7 flexAllCenter text-center px-1">Para contactar con el desarrollador, utiliza nuestro formulario y cuéntanos sobre tus necesidades. ¡Estaré encantado de ayudarte!</p>
          <form className='flexAllCenter w-full h-5/7 flex-col txtLg' onSubmit={handleSubmit}>
          <div className="flexAllCenter flex-col w-full h-2/10">
            <div className='w-5/6 h-full rounded-lg p-1 flexAllCenter'>
              <input type="text" name="name" placeholder="Ingrese su Nombre" className="h-full w-full rounded-lg bg-c_LightGrayBlue border-b-2 border-c_White focus:outline-none focus:border-c_Pink text-center"/>
            </div>
            <div className='w-5/6 h-full rounded-lg p-1 flexAllCenter'>
              <input type="text" name="email" placeholder="Ingrese su Correo" className="h-full w-full rounded-lg bg-c_LightGrayBlue border-b-2 border-c_White focus:outline-none focus:border-c_Pink text-center"/>
            </div>
          </div>
          <div className=' w-5/6 h-5/7 rounded-lg p-2'>
            <textarea className="placeholder:text-c_LightGrayBlue border-y-2 border-c_White rounded-lg bg-c_LightGrayBlue w-full h-full focus:outline-none focus:border-c_Pink p-2" name="textarea" placeholder="Escriba su mensage"></textarea>
          </div>
          <div className="flexAllCenter w-1/3 h-auto"><button className="border-y-2 border-c_White bg-c_LightGrayBlue w-full h-full py-1 rounded-lg hover:border-c_Pink transition-colors">Enviar</button></div>
        </form>
        </div>
      </section>
    </Layout>
  )
}
