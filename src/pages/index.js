import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import Grid0 from '@/components/home/Grid0'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Home() {
  const Router = useRouter()
  const [modal, setModal] = useState(false)
  const [gameMode, setGameMode] = useState({url:"/games/memory",title:"Memoria",img:"bgMemory",description:"Lorem impsum lala lalala de lala galala pop."})
  const [tab, setTab] = useState("memory")
  const [userData, setUserData] = useState({userName:"----", profilePhoto:1})
  // session useEffect
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
  
  function playGame(){
    Router.push(gameMode.url)
  }
  async function logout(){
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_URL_BACKEND+"/logout",{},{withCredentials: true,});
      if(response.status){
        // decidir si debo colocar una notificación
        Router.push("/login")
      }
      Router.push("/login")
    } catch (error) {
      Router.push("/login")
    }
  }

  return (
    <Layout route='private'>
      <section className='w-screen h-screen flex'>
        <div className='h-screen w-5/7 flex'>
          <div className='h-full w-5/7 flex flex-col gap-4 p-6 pr-0'>
            <div className={'bg-cover bg-center w-full h-4/5 relative rounded-sm '+gameMode.img}>
              <div className='absolute top-0 left-0 w-full h-1/7 bgOpaque flexAllCenter txtLg txtSecondary'><p>{gameMode.title}</p></div>
              <button className='bg-c_Pink absolute bottom-10 left-1/3 w-1/3 h-10 flexAllCenter txtLg txtSecondary rounded-md transition-colors hover:margins hover:bg-c_DarckBlue' onClick={playGame}>Play</button>
            </div>
            <div className='bg-c_GrayBlue w-full h-1/5 rounded-sm p-5'>
              <p className='w-full h-2/7 mb-1 txtMd text-c_Pink'>Como jugar?</p>
              <p className='w-full h-5/7'>{gameMode.description}</p>
            </div>
          </div>
          <div className='h-full w-2/7 flexAllCenter flex-col justify-around'>
            <img className={gameMode.url !== "/games/memory"? 'rounded-lg transition-all hover:margins': "rounded-lg transition-all margins outline-c_Pink"} src="/GameMiniature/MemoryMin.jpg" onClick={()=>setGameMode({url:"/games/memory",title:"Memoria",img:"bgMemory",description:"Lorem impsum lala lalala de lala galala pop."})}/>
            <img className={gameMode.url !== "/games/mines" ?'rounded-lg transition-all hover:margins ':"rounded-lg transition-all margins outline-c_Pink"} src="/GameMiniature/MineMin.jpg" onClick={()=>setGameMode({url:"/games/mines",title:"Busca Minas",img:"bgMines",description:"Lorem impsum lala lalala de lala galala pop."})}/>
            <img className={gameMode.url !== "/games/snake" ?'rounded-lg transition-all hover:margins ':"rounded-lg transition-all margins outline-c_Pink"} src="/GameMiniature/SnakeMin.jpg" onClick={()=>setGameMode({url:"/games/snake",title:"Culebrita",img:"bgSnake",description:"Lorem impsum lala lalala de lala galala pop."})}/>
          </div>
        </div>
        {/* Seccion de la sesión */}
        <div className='h-screen w-2/7 border-l-c_GrayBlue border-l-4'>
          <div className='bg-c_GrayBlue w-full h-1/7 flexAllCenter justify-around'>
            <img className='w-1/5 rounded-full hover:rounded-2xl' src='./profileImgs/profilePhoto1.jpg'/>
            <div className='flexAllCenter flex-col'>
              <p>{userData.userName}</p>
            </div>
            <button className='text-c_Pink px-2 py-1 rounded-md transition-all hover:bg-c_DarckBlue' onClick={logout}>Cerrar sesión</button>
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
