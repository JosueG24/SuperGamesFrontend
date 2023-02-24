import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function memory() {

function defaultFunction(){

}

  return (
    <Layout page="memory">
      <div className="w-screen h-screen">
        <header className="w-full h-1/7 bg-c_GrayBlue flex justify-around items-center">
          <Link className="bg-red-700 p-3" href={"/"}>Abandonar</Link>
          <button onClick={defaultFunction} className="">Nivel : ?</button>
          <button onClick={defaultFunction} className="">Puntos : ?</button>
          <button onClick={defaultFunction} className="bg-c_LightBlue p-3">Help</button>
        </header>
        <section className="w-full h-6/7 p-3 flex">
          <div className="w-1/5 h-full bg-c_GrayBlue mr-3">
            aquiestoy
          </div>
          <div className="w-4/5 h-full bg-c_LightGrayBlue">
            <p>memory</p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
