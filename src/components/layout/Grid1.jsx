import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Grid1({mode, userName}) {
  
    const [topPlayers, settopPlayers] = useState([{userName:"----", puntos:0}, {userName:"----", puntos:0}, {userName:"----", puntos:0}, {userName:"---", puntos:0}, {userName:"----", puntos:0}, {userName:"----", puntos:0},{userName:"----", puntos:0}, {userName:"----", puntos:0},{userName:"----", puntos:0}, {userName:"----", puntos:0}])
    const [myPosition, setMyPosition] = useState({userName:"----", puntos:0})

    useEffect(() => {
    async function request(){
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/rancking/global",{mode, userName},{withCredentials: true,});
            const top = response.data.data.top
            const myPosition = response.data.data.myPosition
            console.log(myPosition)
            settopPlayers(top);
            if(typeof myPosition == "object" && Array.isArray(myPosition)){
                setMyPosition(myPosition[0])
            }else if(typeof myPosition == "object"){
                setMyPosition(myPosition)
            }
          } catch (error) {
            
          }
    }
    request()
    }, [])
    

    return (
    <div className='bg-c_GrayBlue w-full h-6/7'>
        <div className='w-full h-1/12 flex font-semibold'>
            <p className="h-full w-1/5 margins rounded-none outline-c_DarckBlue flexAllCenter">#</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter" >Apodo</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter">Puntos</p>
        </div>
        {topPlayers.map((item, index)=>{
            return(
                <div className={index%2 !== 0 ?'w-full h-1/12 flex':"w-full h-1/12 flex bg-c_LightGrayBlue"} key={index}>
                    <p className="h-full w-1/5 margins rounded-none outline-c_DarckBlue flexAllCenter">{index+1}</p>
                    <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter" >{item.userName}</p>
                    <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter">{item.puntos}</p>
                </div>
            )
        })}
        <div className='w-full h-1/12 flex bg-c_Pink font-semibold'>
            <p className="h-full w-1/5 margins rounded-none outline-c_DarckBlue flexAllCenter">#</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter" >{myPosition.userName}</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter">{myPosition.puntos}</p>
        </div>
    </div>
  )
}
