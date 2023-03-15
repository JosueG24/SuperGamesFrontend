import Grid1 from "@/components/layout/Grid1"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function mines() {
  
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [modal, setModal] = useState(true)

  function defaultFunction(){

  }
  return (
    <Layout route="private">
      <div className="w-screen h-screen">
        <header className="w-full h-1/7 bg-c_GrayBlue flex justify-around items-center px-8 txtLg">
          <Link className="bg-c_LightGrayBlue transition-all hover:bg-red-700 p-3 margins" href={"/"}>Regresar</Link>
          <button onClick={defaultFunction} className="">Nivel : {level}</button>
          <button onClick={defaultFunction} className="">Puntos : {points}</button>
          <button onClick={defaultFunction} className="bg-c_LightGrayBlue p-3 px-6 margins transition-all hover:bg-c_Pink">Ayuda</button>
        </header>
        <section className="w-full h-6/7 p-3 flex">
          <div className="w-1/5 h-full mr-3 flex flex-col justify-between">
            <Grid1 mode="mines"/>
            <button className="bg-c_LightGrayBlue w-full h-[calc(14.2857%-1rem)]">someone</button>
          </div>
          <div className="w-4/5 h-full bg-c_LightGrayBlue">
            <p>mines</p>
          </div>
        </section>
        
        {modal == true &&
        <div className="top-0 fixed w-screen h-screen flexAllCenter">
          <div className="w-1/3 h-1/2 bg-c_DarckBlue margins">
            <div className="h-2/3 w-full py-3 px-5">
              <p className="txtLg txtSecondary text-center pb-3">Nueva Partida</p>
              <p className="txtMd">Lorem impsums por doquier lalal lalal lalalal</p>
            </div>
            <div className="h-1/3 w-full  flex justify-center items-center">
              <div className="w-2/4 h-full flex flex-col justify-center">
                <p className="txtMd text-center pb-3">Dificultad</p>
                <div className="flex justify-around txtSm">
                  <button className={level == 1? "bg-c_Pink px-2 py-1 margins rounded-md":"bg-c_LightGrayBlue px-2 py-1 margins rounded-md transition-all"} onClick={()=>setLevel(1)}>Nivel 1</button>
                  <button className={level == 2? "bg-c_Pink px-2 py-1 margins rounded-md":"bg-c_LightGrayBlue px-2 py-1 margins rounded-md transition-all"} onClick={()=>setLevel(2)}>Nivel 2</button>
                  <button className={level == 3? "bg-c_Pink px-2 py-1 margins rounded-md":"bg-c_LightGrayBlue px-2 py-1 margins rounded-md transition-all"} onClick={()=>setLevel(3)}>Nivel 3</button>
                </div>
              </div>
              <button className="w-1/4 margins h-1/3 ml-5 bg-c_LightGrayBlue transition-all hover:bg-c_Pink" onClick={()=>setModal(false)}>Aceptar</button>
            </div>
          </div>
        </div>
        }
      </div>
    </Layout>
  )
}
