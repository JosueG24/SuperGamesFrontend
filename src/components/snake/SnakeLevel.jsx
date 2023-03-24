import React from 'react'
import InitGame from './SN_inicializar.js'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Modal from './SN_modal.jsx'

export default function MyLevel({ level, btnStart, btnRestart, inputPoints, setInputPoints}) {
  let misPuntos = 0;
  const [añaaña, setAñaaña] = useState(0)
  useEffect(() => {
    setAñaaña(inputPoints)
  }, [inputPoints])
  
  const [inputState, setInputState] = useState("")
  const [myGame, setMyGame] = useState(null)
  const [modalActive, setModalActive] = useState(null);

    const canvasRef  = useRef(null);
  
    useEffect(() => {
      if(btnStart == true){
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const gameInitialized = new InitGame(ConectorApp, context);
        setMyGame(gameInitialized)
        gameInitialized.InitializedGame();
        gameInitialized.startListener1(btnStart);
        setInputPoints(0)
      }
    }, [btnStart])
    

    async function ConectorApp(text, action){
      if(action == "State"){
        setInputState(text)
      }
      if(action == "eat"){
        setInputPoints(text)
        misPuntos = text;
      }
      if(action == "over"){
        btnRestart();
        // const resp = await maxPuntaje(text, "snake");
        try {
            const resp = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/validateRecord", {puntuacion:misPuntos, mode:"snake", level},{withCredentials:true});
            // resp = status, data
            if(resp.data.message == "siRecord"){
              setModalActive("Felicitaciones!!")
              return
            }
            if(resp.data.message == "noRecord"){
              setModalActive("Mala suerte!!")
              return
            }
            if(resp.data.message == "Primer registro guardado"){
              setModalActive("Hemos guardado su primer registro!!")
              return
            }
            setModalActive("Ha ocurrido un error inesperado")
        } catch (error) {
            console.log({error})
            setModalActive("Ha ocurrido un error inesperado")
        }
      }      
    }

    // funcion del modal
    async function funcSiModal(){
      try {
        const resp = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/saveScore", {puntuacion:añaaña, mode:"snake", level},{withCredentials:true});
        misPuntos = 0;
        return resp.status
      } catch (error) {
        console.log({error})
        return false
      }
    }
  return (
    <div className='w-full h-full flex'>
        <div id='MinesDiv' className='w-full h-full flex items-center justify-center flex-wrap'>
          <canvas ref={canvasRef} id='canvasSnake' width="375" height="375" className='bg-c_LightGrayBlue '/>
          {modalActive !== null && 
          <Modal desactive={()=>{setModalActive(null)}}
                title={modalActive}
                funcSi={funcSiModal}
                />}
        </div>
    </div>
  )
}
