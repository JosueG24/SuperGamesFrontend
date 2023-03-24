import React from 'react'
import axios from 'axios';
import { useState } from 'react';

export default function Modal({desactive, funcSi, title}) {
  const [saved, setSaved] = useState(null)

  async function sisi(){
  const resp = await funcSi()
  if(resp !== 200){
    setSaved({
      modaltitle: "Ha ocurrido un error",
      modaltext :"Lo sentimos, no hemos podido guardar su nueva puntuación :c. Revise su coneccion a internet"
    })
  }else{
    setSaved({
      modaltitle: "Hemos guardado su record",
      modaltext :""
    })
  }
  }

  function funcNo(){
    desactive();
  }
  return (
    <>
    {saved == null &&
    <div className='absolute top-0 left-0 w-screen h-screen flexAllCenter '>
      <div className=' margins bg-c_GrayBlue text-white p-2 absolute'>
          <p className='text-lg font-semibold text-center'>{title}</p>
          {title == "Felicitaciones!!" && <p className='text-center'>Has superado tu record de puntaje, ¿deseas guardar los datos de esta partida?</p>}
          {title == "Hemos guardado su primer registro!!" && <p className='text-center'>Buena partida, vuelve a intentarlo y supera tu record actual!</p>}
          {title == "Mala suerte!!" && <p className='text-center'>Has tenido mejores puntuaciones, suerte para la proxima.</p>}
          {title == "Ha ocurrido un error inesperado" && <p className='text-center'>Lo sentimos, hemos detectado un error. Puede que no tengas conexion a internet.</p>}
          <div className='flex justify-around m-2'>
              {title !== "Felicitaciones!!" && <button onClick={funcNo}>ok</button>}
              {title == "Felicitaciones!!" && <button onClick={sisi}>Si</button>}
              {title == "Felicitaciones!!" && <button onClick={funcNo}>No</button>}
          </div>
      </div>
    </div>
    }
    {saved !== null && saved !== true  &&
    <div className='absolute top-0 left-0 w-screen h-screen flexAllCenter'>
      <div className=' margins bg-c_GrayBlue text-white p-2 absolute'>
        <p className='text-lg font-semibold text-center'>{saved.modaltitle}</p>
        <p className='text-center'>{saved.modaltext}</p>
        <div className='flex justify-around m-2'>
          <button className='' onClick={funcNo}>ok</button>
        </div>
      </div>
    </div>
    }
    </>
  )
}
