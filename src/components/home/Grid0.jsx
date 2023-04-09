import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

export default function Grid0({tab, modal, handleModal}) {
    const [data, setData] = useState([{userName:"----", puntos:0, nivel:0, fecha:0}, {userName:"----", puntos:0, nivel:0, fecha:0}, {userName:"----", puntos:0, nivel:0, fecha:0}, {userName:"---", puntos:0, nivel:0, fecha:0}, {userName:"----", puntos:0, nivel:0, fecha:0}, {userName:"----", puntos:0, nivel:0, fecha:0},{userName:"----", puntos:0, nivel:0, fecha:0}, {userName:"----", puntos:0, nivel:0, fecha:0},{userName:"----", puntos:0, nivel:0, fecha:0}, {userName:"----", puntos:0, nivel:0, fecha:0}])
    const [myData, setMyData] = useState({userName:"----", puntos:0, nivel:0, fecha:0})

    function convertToDate(date){
        const myDate = new Date()
        myDate.setTime(date);
        const res =  myDate.toLocaleDateString();
        if(res == "Invalid Date") return 0
        return res
    }

    //useEfect
    useEffect(() => {
      async function req(){
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/rancking/global",{mode:tab},{withCredentials:true})
            if(res.status !== 200){
                handleModal({message:"han ocurrido algunos errores", errors:["Ha fallado la peticion de datos al servidor, revise su conecxión a internet."], type:"error"})  
                return false
            }
            return res
        } catch (error) {
            handleModal({message:"han ocurrido algunos errores", errors:["Ha fallado la peticion de datos al servidor, revise su conecxión a internet."], type:"error"})  
            return false
        }
      }
      req().then((res)=>{
        if(res == false){
            return
        }
        setData(res.data.data.top)
        if(typeof res.data.data.myPosition == "object" && Array.isArray(res.data.data.myPosition)){
            setMyData(res.data.data.myPosition[0])
        }else if(typeof res.data.data.myPosition == "object"){
            setMyData(res.data.data.myPosition)
        }
      })
    }, [tab])
    
  return (
    <>
    <div className='bg-c_GrayBlue w-6/7 h-6/7'>
        <div className='w-full h-1/12 flex font-semibold'>
            <p className="h-full w-1/6 margins rounded-none outline-c_DarckBlue flexAllCenter">#</p>
            <p className="h-full w-2/6 margins rounded-none outline-c_DarckBlue flexAllCenter" >Apodo</p>
            <p className="h-full w-1/6 margins rounded-none outline-c_DarckBlue flexAllCenter">Puntos</p>
            <p className="h-full w-2/6 margins rounded-none outline-c_DarckBlue flexAllCenter">Fecha</p>
        </div>
        <div className='w-full h-10/12'>
        {data.map((item, index)=>{
            return(
                <div className={index%2 !== 0 ?'w-full h-1/10 flex':"w-full h-1/10 flex bg-c_LightGrayBlue"} key={index}>
                    <p className="h-full w-1/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden">{index+1}</p>
                    <p className="h-full w-2/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden" >{item.userName}</p>
                    <p className="h-full w-1/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden">{item.puntos}</p>
                    <p className="h-full w-2/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden">{convertToDate(item.date)}</p>
                </div>
            )
        })}
        </div>
        <div className='w-full h-1/12 bg-c_Pink flex font-semibold'>
            <p className="h-full w-1/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden">#</p>
            <p className="h-full w-2/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden" >{myData.userName}</p>
            <p className="h-full w-1/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden">{myData.puntos}</p>
            <p className="h-full w-2/6 margins rounded-none outline-c_DarckBlue flexAllCenter overflow-hidden">{convertToDate(myData.date)}</p>
        </div>
    </div>
    </>
  )
}
