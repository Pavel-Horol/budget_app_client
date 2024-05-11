import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import { useDispatch } from 'react-redux'
import { getToken } from './helper/localstorage.helper.ts'
import { AuthService } from './services/auth.service.ts'
import { login } from './store/user/userSlice.ts'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const checkAuth = async () => {
      const token = getToken()
      try {
        if(token) {
          const data = await AuthService.getProfile()
          if(data){
            dispatch(login(data))
          }
        }
      }catch (error){
        //@ts-ignore
        toast.error(JSON.stringify(error.message))
      }
  }
  useEffect(() => {
    checkAuth()
  }, [])
  return (
      <RouterProvider router={router}/>
  )
}

export default App
