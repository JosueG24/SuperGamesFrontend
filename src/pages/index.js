import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import Grid0 from '@/components/home/Grid0'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [modal, setModal] = useState(false)
  const [tab, setTab] = useState("memory")
  const [userData, setUserData] = useState({userName:"----", profilePhoto:1})
  useEffect(() => {
      async function req(){
        try {
          const res = await axios.get(process.env.NEXT_PUBLIC_URL_BACKEND+"/sessionValidate",{withCredentials: true,}) 
          if(res.status !== 200){
              setModal({message:"han ocurrido algunos errores", errors:["Ha fallado la peticion de datos al servidor, revise su conecxión a internet."], type:"error"})  
              return false
          }
          return res
      } catch (error) {
          setModal({message:"han ocurrido algunos errores", errors:["Ha fallado la peticion de datos al servidor, revise su conecxión a internet."], type:"error"})  
          return false
      }
    }
    req().then((res)=>{
      if(res == false){
          return
      }
      if(res.data.data === "guest"){
        setUserData({userName:"Invitado", profilePhoto:1})  
        return
      }
      setUserData({userName:res.data.data, profilePhoto:1})
    })
  }, [])
  
  return (
    <Layout route='private'>
      <section className='w-screen h-screen flex'>
        <div className='h-screen w-5/7'>

        </div>
        <div className='h-screen w-2/7 border-l-c_GrayBlue border-l-4'>
          <div className='bg-c_GrayBlue w-full h-1/7 flexAllCenter justify-around'>
            <img className='w-1/5 rounded-full' src='./profilePhoto1.jpg'/>
            <div className='flexAllCenter flex-col'>
              <p>{userData.userName}</p>
            </div>
            <button className='text-c_Pink px-2 py-1 rounded-md transition-all hover:bg-c_DarckBlue'>Cerrar sesión</button>
          </div>
          <div className='w-full h-6/7 flexAllCenter flex-col justify-around'>
            <p className='txtMd txtSecondary'>Las mejores puntuaciones</p>
            <div className='w-full txtMd font-semibold flexAllCenter justify-around'>
              <button className={tab=="memory"?"bg-c_Pink px-2 py-1 rounded-md":'bg-c_GrayBlue px-2 py-1 rounded-md'} onClick={()=>setTab("memory")}>Memoria</button>
              <button className={tab=="mines"?"bg-c_Pink px-2 py-1 rounded-md":'bg-c_GrayBlue px-2 py-1 rounded-md'} onClick={()=>setTab("mines")}>BuscaMinas</button>
              <button className={tab=="snake"?"bg-c_Pink px-2 py-1 rounded-md":'bg-c_GrayBlue px-2 py-1 rounded-md'} onClick={()=>setTab("snake")}>Snake</button>
            </div>
            <Grid0 tab={tab} modal={modal} handleModal={(x)=>setModal(x)}/>
          </div>
        </div>
        {modal !== false &&
        <div className="top-0 right-0 fixed flexAllCenter w-screen h-screen">
          <div className={modal.type == "error"? "bg-c_GrayBlue margins outline-c_Pink w-2/4 h-1/2 flexAllCenter flex-col":"bg-c_GrayBlue margins w-2/4 h-1/2 flexAllCenter flex-col"}>
            <p className="txtLg txtSecondary py-5 text-center">{modal.message}</p>
            {modal.errors.map((item, index)=>{return(
                <p className="txtMd pb-3" key={index}> - {item}</p>
              )})}
            <button className="bg-c_LightGrayBlue rounded-md px-4 py-2 transition-all hover:margins" onClick={modal.type == "error"?()=>setModal(false):()=>{}}>Cerrar</button>
          </div>
        </div>
        }
      </section>
    </Layout>
  )
}
