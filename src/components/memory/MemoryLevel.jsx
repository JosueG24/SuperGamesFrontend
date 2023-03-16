import React from 'react'
import Card from "./MemoryCard"
import Modal from './MemoryModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ComprobarPar(val1, val2, Level){
    if(val1 + val2 == Level*8+1){
        return true
    }
    return false
}

export default function MyLevel({Level, setPuntuacion, Puntuacion, idRandomizeds}) {
    
    const sistemaPunteo = [Level*3, Level]
    /////// Aquí manejaremos el control de girar cartas depar en par
    const [BtnsPushed, setBtnsPushed] = useState([])
    const [Parejas, setParejas] = useState(0)
    const [modalActive, setModalActive] = useState(null);
    useEffect(() => {
        // si hay 2 cartas levantadas
        if(BtnsPushed.length == 2){
            // desactive los botones
            document.querySelector("#MemoryDiv").classList.add("notClick")
            // valide si son pares
            let Valido = ComprobarPar(BtnsPushed[0], BtnsPushed[1], Level)
            // si son pares, de puntos y dejelas volteadas
            if(Valido == true){
                setPuntuacion(Puntuacion + sistemaPunteo[0])
                document.querySelector("#MemoryDiv").classList.remove("notClick")
                setBtnsPushed([])
                setParejas(Parejas + 1)
                // si no volteelas
            }else{
            setTimeout(()=>{
                setPuntuacion(Puntuacion - sistemaPunteo[1])
                document.querySelector("#frontNo"+BtnsPushed[0]).classList.remove("frontFlip")
                document.querySelector("#backNo"+BtnsPushed[0]).classList.remove("backFlip")
                document.querySelector("#frontNo"+BtnsPushed[1]).classList.remove("frontFlip")
                document.querySelector("#backNo"+BtnsPushed[1]).classList.remove("backFlip")
                setBtnsPushed([])
                document.querySelector("#MemoryDiv").classList.remove("notClick")
            },1000)}
        }
    }, [BtnsPushed])      
    
    useEffect(() => {
        async function verifyPoints(){
            try {
                console.log({puntuacion:Puntuacion, mode:"memory", level:Level})
                const resp = await axios.post("http://localhost:4000/api/V1"+"/validateRecord", {puntuacion:Puntuacion, mode:"memory", level:Level},{withCredentials:true});
                // resp = status, data
                console.log(resp.data.message)

                if(resp.data.message == "siRecord"){
                    setModalActive("Felicitaciones!!");
                    return
                }
                if(resp.data.message == "noRecord"){
                    setModalActive("Mala suerte!!")
                    return
                }
                if(resp.data.message == "createNewRegister"){
                    setModalActive("Hemos guardado su primer registro!!")
                    return
                }
                setModalActive("Lo sentimos, ha ocurrido un error con la conexión y no hemos podido validar su puntuación")
            } catch (error) {
                console.log(error)
                setModalActive("Lo sentimos, ha ocurrido un error con la conexión y no hemos podido validar su puntuación")
            }
        }
        if(Parejas == (Level*8)/2){
            verifyPoints();
        }
    }, [Parejas])

    function funcOnClick(num){
        setBtnsPushed([...BtnsPushed, num])
    }

    // preparamos numCards para almacenar las cards
    let NumCards = [];
    // organizamos un array con la imagen qwe corresponde a cada carta
    let ImageCards =[];
    // una vuelta por cada item de idRandomized
    for(let i=1;i<=idRandomizeds.length;i++){
        // simplificaos el nombre del numButton
        let numButton = idRandomizeds[i-1];
        // clasificamos en mayores o menores de la mitad
        if(numButton - idRandomizeds.length/2 <= 0){
            /// a los menores asignamos su mismo numero
            ImageCards.push(numButton)
        }else{
            // y a los mayores el numero de su contraparte menor
            ImageCards.push((idRandomizeds.length+1)-numButton)
        }
    }
    
    // cremaos los botrones y repartimos los numeros
    for(let i =1; i <= Level*8; i++){
        NumCards.push(<Card key={i} id={idRandomizeds[i-1]} Level={Level} funcOnClick={funcOnClick} image={"/Memory/Mandala"+ImageCards[i-1]+".png"}/>)
    }  

  return (
    <div className='w-full h-full flex text-sm'>
        <div id='MemoryDiv' className='w-full h-full flex items-center justify-center flex-wrap'>
            {NumCards}
            {modalActive !== null && <Modal desactive={()=>{
                setModalActive(null)}}
                title={modalActive}
                mode={"memory"}
                puntuacion={Puntuacion}
                level={Level}
                />}
        </div>
    </div>
  )
}
