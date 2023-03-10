import React from 'react'

export default function Grid1({mode}) {
  
    const MyArr = [{apodo:"pedril", puntaje:55}, {apodo:"pedril", puntaje:55}, {apodo:"pedril", puntaje:55}, {apodo:"pedril", puntaje:55}, {apodo:"pedril", puntaje:55}, {apodo:"pedril", puntaje:55}]
  
    return (
    <div className='bg-c_GrayBlue w-full h-6/7'>
        <div className='w-full h-1/12 flex font-semibold'>
            <p className="h-full w-1/5 margins rounded-none outline-c_DarckBlue flexAllCenter">#</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter" >Apodo</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter">Puntos</p>
        </div>
        {MyArr.map((item, index)=>{
            return(
                <div className={index%2 !== 0 ?'w-full h-1/12 flex':"w-full h-1/12 flex bg-c_LightGrayBlue"} key={index}>
                    <p className="h-full w-1/5 margins rounded-none outline-c_DarckBlue flexAllCenter">{index+1}</p>
                    <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter" >{item.apodo}</p>
                    <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter">{item.puntaje}</p>
                </div>
            )
        })}
        <div className='w-full h-1/12 flex bg-c_Pink font-semibold'>
            <p className="h-full w-1/5 margins rounded-none outline-c_DarckBlue flexAllCenter">#</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter" >Apodo</p>
            <p className="h-full w-2/5 margins rounded-none outline-c_DarckBlue flexAllCenter">Puntos</p>
        </div>
    </div>
  )
}
