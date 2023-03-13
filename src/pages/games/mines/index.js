import Grid1 from "@/components/layout/Grid1"
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
    <Layout route="private">
      <div className="w-screen h-screen">
        <header className="w-full h-1/7 bg-c_GrayBlue flex justify-around items-center px-8">
          <Link className="bg-red-700 p-3 margins" href={"/"}>Abandonar</Link>
          <button onClick={defaultFunction} className="">Nivel : {level}</button>
          <button onClick={defaultFunction} className="">Puntos : {points}</button>
          <button onClick={defaultFunction} className="bg-c_LightBlue p-3 px-6 margins">Help</button>
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
        <div className="fixed bottom-1/4 left-1/3 w-1/3 h-1/2 bg-c_DarckBlue margins">
        <div className="h-2/3 w-full ">
          <p>Como jugar</p>
          <p>Lorem impsums por doquier lalal lalal lalalal</p>
        </div>
        <div className="h-1/3 w-full  flex justify-center items-center">
          <div className="w-1/3 h-full flex flex-col justify-center">
            <p>Si fallas : -2</p>
            <p>Si aciertas : +2</p>
          </div>
          <button className="w-1/4 margins h-1/3 ml-5 bg-c_LightBlue" onClick={()=>setModal(false)}>Close</button>
        </div>
      </div>
        }
      </div>
    </Layout>
  )
}
