import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'

const PrivateRoute = ({ children, route }) => {
  const router = useRouter()

  useEffect(() => {

    async function validation(){
        // validamos si estamos en el login
        if(route === "login"){
            return true // requiere proceso, recordara
        }else if(route === "public"){
            return true
        }else{
            try {
                const req = await axios.get(process.env.NEXT_PUBLIC_URL_BACKEND+"/sessionValidate",{withCredentials: true,})        
                return req.data.data
            } catch (error) {
                return false
            }
        }
    }
    
    validation().then((res)=>{
        if (!res) {
          router.push('/login')
        }
    })
}, [router])

  return <>{children}</>
}

export default PrivateRoute