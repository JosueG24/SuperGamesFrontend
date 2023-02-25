import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function mines() {
  
  const [level, setLevel] = useState(undefined)
  const [points, setPoints] = useState(0)
  const [modal, setModal] = useState(true)

  function defaultFunction(){

  }
  return (
    <Layout page="mines">
      <div className="w-screen h-screen">
        <header className="w-full h-1/7 bg-c_GrayBlue flex justify-around items-center">
          <Link className="bg-red-700 p-3" href={"/"}>Abandonar</Link>
          <button onClick={defaultFunction} className="">Nivel : {level}</button>
          <button onClick={defaultFunction} className="">Puntos : {points}</button>
          <button onClick={defaultFunction} className="bg-c_LightBlue p-3">Help</button>
        </header>
        <section className="w-full h-6/7 p-3 flex">
          <div className="w-1/5 h-full bg-c_GrayBlue mr-3">
            aquiestoy
          </div>
          <div className="w-4/5 h-full bg-c_LightGrayBlue">
            <p>mines</p>
          </div>
        </section>
        
        {modal == true &&
        <div className="fixed bottom-1/4 left-1/4 w-1/2 h-1/2 bg-c_DarckBlue">
          <button onClick={()=>setModal(false)}>Close</button>
        </div>
        }
      </div>
    </Layout>
  )
}
