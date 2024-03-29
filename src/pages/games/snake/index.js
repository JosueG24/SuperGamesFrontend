import Grid1 from "@/components/layout/Grid1"
import Layout from "@/components/layout/Layout"
import { useRouter } from "next/router"
import { useState } from "react"
import MyLevel from "@/components/snake/SnakeLevel"

export default function snake() {
  const router = useRouter()
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [modal, setModal] = useState(true)
  const [start, setStart] = useState(null)

  function fncStart(){
      setStart(true)
  }
  function fncRestart(){
    setStart(false)
  }


  function defaultFunction(){
  }

  function funcReset(){

  }
  return (
    <Layout route="private">
      <div className="w-screen h-screen">
        <header className="w-full h-1/7 bg-c_GrayBlue flex justify-around items-center px-8 txtLg">
          <button className="bg-c_LightGrayBlue transition-all hover:bg-red-700 p-3 margins" onClick={()=>router.back()}>Regresar</button>
          <button onClick={defaultFunction} className="">Nivel : {level}</button>
          <button className={start == false || start == null ? "bg-c_Pink p-3 px-6 margins transition-all hover:bg-c_LightGrayBlue" : "p-3 px-6 margins"} onClick={fncStart}>{start == false || start == null ? "Comenzar": "Juegue"}</button>   
          <button onClick={defaultFunction} className="">Puntos : {points}</button>
          <button onClick={defaultFunction} className="bg-c_LightGrayBlue p-3 px-6 margins transition-all hover:bg-c_Pink">Ayuda</button>
        </header>
        <section className="w-full h-6/7 p-3 flex">
          <div className="w-1/5 h-full mr-3 flex flex-col justify-between">
            <Grid1 mode="snake"/>
            <button className="bg-c_LightGrayBlue w-full h-[calc(14.2857%-1rem)] txtLg flexAllCenter transition-all hover:bg-c_Pink" onClick={funcReset}></button>
          </div>
          <div className="w-4/5 h-full">
            <MyLevel level={level} inputPoints={points} setInputPoints={(x)=>setPoints(x)} btnStart={start} btnRestart={fncRestart}/>
          </div>
        </section>

        {modal == true &&
        <div className="top-0 fixed w-screen h-screen flexAllCenter">
          <div className="w-1/3 h-1/2 bg-c_DarckBlue margins">
            <div className="h-2/3 w-full py-3 px-5">
              <p className="txtLg txtSecondary text-center pb-3">Nueva Partida</p>
              <p className="txtMd">Debes controlar una serpiente para que coma los objetos que aparecen en el tablero sin chocar con los bordes o con la propia serpiente. A medida que la serpiente come, crece en longitud, lo que hace más difícil evitar colisiones.</p>
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
