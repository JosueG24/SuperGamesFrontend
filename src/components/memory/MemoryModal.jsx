import { useState } from 'react';
import axios from 'axios';

export default function Modal({desactive, mode, puntuacion, level, title}) {
  const [saved, setSaved] = useState(null)

  async function funcSi(){
    try {
        const resp = await axios.post("http://localhost:4000/api/V1"+"/saveScore", {puntuacion, mode, level},{withCredentials:true});
        if(resp.status == 200){
          setSaved({
            modaltitle: "Hemos guardado su record",
            modaltext :""
          })
          return
        }
        setSaved({
          modaltitle: "Ha ocurrido un error",
          modaltext :"Lo sentimos, no hemos podido guardar su nueva puntuación. Revise su coneccion a internet"
        })
    } catch (error) {
      console.log(error)
      setSaved({
        modaltitle: "Ha ocurrido un error",
        modaltext :"Lo sentimos, no hemos podido guardar su nueva puntuación. Revise su coneccion a internet"
      })
    }
  }

  function funcNo(){
    desactive();
  }
  return (
    <>
    {saved == null &&
    <div className='absolute top-0 left-0 w-screen h-screen flexAllCenter'>
      <div className='margins bg-c_GrayBlue text-white p-2 absolute'>
          <p className='text-lg font-semibold text-center txtSecondary'>{title}</p>
          {title == "Felicitaciones!!" && 
          <p className='text-center txtMd'>Has superado tu record de puntaje, ¿deseas guardar los datos de esta partida?</p>}
          {title == "Hemos guardado su primer registro!!" && 
          <p className='text-center txtMd'>Buena partida, vuelve a intentarlo y supera tu record actual!</p>}
          {title == "Mala suerte!!" && 
          <p className='text-center txtMd'>Has tenido mejores puntuaciones, suerte para la proxima.</p>}
          {title == "Lo sentimos, ha ocurrido un error con la conexión y no hemos podido validar su puntuación" && 
          <p className='text-center txtMd'>Lo sentimos, hemos detectado un error. Puede que no tengas conexion a internet.</p>}
          
          <div className='flex justify-around m-2'>
              {title !== "Felicitaciones!!" && <button onClick={funcNo}>ok</button>}
              {title == "Felicitaciones!!" && <button onClick={funcSi}>Si</button>}
              {title == "Felicitaciones!!" && <button onClick={funcNo}>No</button>}
          </div>
      </div>
    </div>
    }
    {saved !== null &&
    <div className='absolute top-0 left-0 w-screen h-screen flexAllCenter'>
      <div className=' margins bg-c_GrayBlue text-white p-2 absolute'>
        <p className='text-lg font-semibold text-center txtSecondary'>{saved.modaltitle}</p>
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
