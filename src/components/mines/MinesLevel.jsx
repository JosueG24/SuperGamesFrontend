import React from 'react'
import { useState, useEffect } from 'react'
import Card from './MinesCard'
import { useRouter } from 'next/router';

export default function MyLevel({Level, handlePuntuacion, arrayMap}) {
    // const router = useRouter();
    // let cantBoombs ;
    // if(Level == 1) cantBoombs = 3;
    // if(Level == 2) cantBoombs = 5;
    // if(Level == 3) cantBoombs = 8;

    // abandona partida
    function acabar(){
    }

    // Establecemos el array de cards respecto al nivel modificado
    const [NumCards, setNumCards] = useState([])
    useEffect(() => {
        let myNumCards = [];
        if(arrayMap !== undefined){
            for(let row = 1; row <= Level+3; row++){
                for(let col = 1; col <= Level+3; col++){
                    let key =row.toString()+col.toString()
                    myNumCards.push(<Card key={key} id={key} Level={Level} funcOnClick={handlePuntuacion} value={arrayMap[row-1][col-1]}/>)
                }
            }
            setNumCards(myNumCards)
        }
    }, [arrayMap])
    
    return (
    <div id='MinesDiv' className='w-full h-full flex items-center justify-center flex-wrap'>
            {NumCards}
    </div>
  )
}
