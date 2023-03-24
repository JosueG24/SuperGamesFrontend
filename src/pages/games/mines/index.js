import Grid1 from "@/components/layout/Grid1"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from "react"
import MyLevel from "@/components/mines/MinesLevel"
import mineArray from "@/components/mines/create_array"
import Modal from '@/components/mines/MinesModal';

export default function mines() {
  
  // session useEfect
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
      console.log({error})
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

  const [modal, setModal] = useState(true)
  const [errorModal, setErrorModal] = useState(false)
  const [superModal, setSuperModal] = useState(false)

  // Controlador de carta levantada (se invoca a cada carta descubierta)
  let misPuntos = 0;
  async function handlePuntuacion(isBomb){
    if(isBomb !== true){
      misPuntos = misPuntos+(50+(level*50))
      setPuntuacion(misPuntos)
  }else{
      document.querySelector("#MinesDiv").classList.add("notClick")
      //Aqui la consulta de record
      try {
          const resp = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/validateRecord", {puntuacion:misPuntos, mode:"mines", level:level},{withCredentials:true});
          if(resp.status !== 200){ 
              setSuperModal("Ha ocurrido un error inesperado")
              return
          }
          if(resp.data.message == "siRecord") {
            setSuperModal("Felicitaciones!!")
            return
          }
          if(resp.data.message == "noRecord"){ 
            setSuperModal("Mala suerte!!")
            return
          }
          if(resp.data.message == "createNewRegister"){
            setSuperModal("Hemos guardado su primer registro!!")
            return
          }
          setSuperModal("Ha ocurrido un error inesperado") 
      } catch (error) {
          console.log({error})
          setSuperModal("Ha ocurrido un error inesperado") 
      }
  }
  }

  // Creamos el array de posiciones
  let myObject;
  const [mapArray, setMapArray] = useState(myObject)
  useEffect(() => {
    if(level !== null){
      myObject = new mineArray(level);
      setMapArray(myObject.mapArray)
    }else{
      myObject = null;
      setMapArray(myObject)
    }
  }, [level])

function defaultFunction(){}

  return (
    <Layout route="private">
      <div className="w-screen h-screen">
        <header className="w-full h-1/7 bg-c_GrayBlue flex justify-around items-center px-8 txtLg">
          <Link className="bg-c_LightGrayBlue transition-all hover:bg-red-700 p-3 margins" href={"/"}>Regresar</Link>
          <button onClick={defaultFunction} className="">Nivel : {level}</button>
          <button onClick={defaultFunction} className="">Puntos : {Puntuacion}</button>
          <button onClick={defaultFunction} className="bg-c_LightGrayBlue p-3 px-6 margins transition-all hover:bg-c_Pink">Ayuda</button>
        </header>
        <section className="w-full h-6/7 p-3 flex">
          <div className="w-1/5 h-full mr-3 flex flex-col justify-between">
            <Grid1 mode="mines" userName={userData.userName}/>
            <Link className="bg-c_LightGrayBlue w-full h-[calc(14.2857%-1rem)] txtLg flexAllCenter transition-all hover:bg-c_Pink" href={"/games/memory"}>Reiniciar</Link>
          </div>
          <div className="w-4/5 h-full bg-c_LightGrayBlue">
            {/* Game */}
            <MyLevel Level={level} handlePuntuacion={handlePuntuacion} arrayMap={mapArray}/>
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
        {superModal !== false &&
            <Modal desactive ={()=>setSuperModal(false)} mode="mines" puntuacion={Puntuacion} level={level} title={superModal}/>}
      </div>
    </Layout>
  )
}
