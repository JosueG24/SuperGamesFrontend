import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import Grid1 from "@/components/layout/Grid1"
import MyLevel from "@/components/memory/MemoryLevel"
import axios from "axios"

export default function memory() {
  
  // Session useEffect
  const [userData, setUserData] = useState({userName:"----", profilePhoto:1})
  useEffect(() => {
    async function req(){
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_URL_BACKEND+"/sessionValidate",{withCredentials: true,}) 
        if(res.status !== 200){
            setErrorModal({message:"han ocurrido algunos errores", errors:["Ha fallado la peticion de datos al servidor, revise su conecxión a internet."], type:"error"})  
            return false
        }
        return res
    } catch (error) {
        setErrorModal({message:"han ocurrido algunos errores", errors:["Ha fallado la peticion de datos al servidor, revise su conecxión a internet."], type:"error"})  
        return false
    }
  }
  req().then((res)=>{
    if(res == false){
        return
    }
    if(res.data.data === "guest"){
      setUserData({userName:"guest", profilePhoto:1})  
      return
    }
    setUserData({userName:res.data.data, profilePhoto:1})
  })
  }, [])
  
  const [level, setLevel] = useState(1)
  const [Puntuacion, setPuntuacion] = useState(0)
  const [idRandomizeds, setidRandomizeds] = useState(randomizeArray(level*8))
  
  const [modal, setModal] = useState(true)
  const [errorModal, setErrorModal] = useState(false)

  useEffect(() => {
    setidRandomizeds(randomizeArray(level*8))
  }, [level])
  

  function defaultFunction(){

  }

  function randomizeArray(cantidad){
      function randomize(cantidad){
          return Math.floor(Math.random()*cantidad)+1
      }
      let myArr = [];
      for(let i = 1; i<= cantidad; i++){
          let random = randomize(cantidad)
          while (myArr.includes(random)) {
              random = randomize(cantidad)
          }
          myArr.push(random)
      }
      return myArr
  }

  function funcReset(){
    // volteamos las cards que estaban levantadas
    const cardFFlip = document.querySelectorAll(".frontFlip")
    cardFFlip.forEach(card=>{
      card.classList.remove("frontFlip")
    })
    const cardBFlip = document.querySelectorAll(".backFlip")
    cardBFlip.forEach(card=>{
      card.classList.remove("backFlip")
    })
    // reseteamos los hocks
    setLevel(1)
    setModal(true)
    setPuntuacion(0)
    setidRandomizeds(randomizeArray(level*8))
    setErrorModal(false)
  }

  return (
    <Layout route="private">
      <div className="w-screen h-screen">
        <header className="w-full h-1/7 bg-c_GrayBlue flex justify-around items-center px-8 txtLg">
          <Link className="bg-c_LightGrayBlue transition-all hover:bg-red-700 p-3 margins" href={"/"}>Regresar</Link>
          <button onClick={defaultFunction} className="">Nivel : {level}</button>
          <button onClick={defaultFunction} className="">Puntos : {Puntuacion}</button>
          <Link className="bg-c_LightGrayBlue p-3 px-6 margins transition-all hover:bg-c_Pink" href={"/support"}>Ayuda</Link>
        </header>
        <section className="w-full h-6/7 p-3 flex">
          <div className="w-1/5 h-full mr-3 flex flex-col justify-between">
            <Grid1 mode="memory" userName={userData.userName}/>
            <button className="bg-c_LightGrayBlue w-full h-[calc(14.2857%-1rem)] txtLg flexAllCenter transition-all hover:bg-c_Pink" onClick={funcReset}>Reiniciar</button>
          </div>
          <div className="w-4/5 h-full bg-c_LightGrayBlue">
            {/* // Game */}
            <MyLevel Level={level} Puntuacion={Puntuacion} setPuntuacion={(x)=>setPuntuacion(x)} idRandomizeds={idRandomizeds}/>
          </div>
        </section>
        
        {modal == true &&
        <div className="top-0 fixed w-screen h-screen flexAllCenter">
          <div className="w-1/3 h-1/2 bg-c_DarckBlue margins">
            <div className="h-2/3 w-full py-3 px-5">
              <p className="txtLg txtSecondary text-center pb-3">Nueva Partida</p>
              <p className="txtMd pb-3">Para jugar, debes seleccionar dos cartas y darles vuelta para ver la imagen que tienen en su parte frontal. Si las cartas seleccionadas son iguales, habrás encontrado una pareja y las cartas permanecerán boca arriba en el tablero. Si no son iguales, se volverán a colocar boca abajo en el tablero y deberás recordar su ubicación para encontrar su pareja en el futuro.</p>
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
        {errorModal !== false &&
        <div className="top-0 right-0 fixed flexAllCenter w-screen h-screen">
          <div className={errorModal.type == "error"? "bg-c_GrayBlue margins outline-c_Pink w-2/4 h-1/2 flexAllCenter flex-col":"bg-c_GrayBlue margins w-2/4 h-1/2 flexAllCenter flex-col"}>
            <p className="txtLg txtSecondary py-5 text-center">{errorModal.message}</p>
            {errorModal.errors.map((item, index)=>{return(
                <p className="txtMd pb-3" key={index}> - {item}</p>
              )})}
            <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins" onClick={errorModal.type == "error"?()=>setErrorModal(false):()=>{}}>Cerrar</button>
          </div>
        </div>
        }
      </div>
    </Layout>
  )
}
