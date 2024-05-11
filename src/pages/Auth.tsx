import React, { FC, useState } from 'react'
import { AuthService } from '../services/auth.service.ts'
import { toast } from 'react-toastify'
import { setToken } from '../helper/localstorage.helper.ts'
import { useAppDispatch } from '../store/hooks.ts'
import { login } from '../store/user/userSlice.ts'
import { useNavigate } from 'react-router-dom'

export const Auth:FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault()
            const data = await AuthService.login({email, password})
            if(data){
                setToken('token', data.token)
                dispatch(login(data))
                toast.success('You logged in')
                navigate('/')
            }
        } catch(error) {
            //@ts-expect-error type problem
            const errorData = error.response?.data.message
            toast.error(errorData.toString())
        }
    }
    const registrationHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault()
            const data = await AuthService.registration({
                email,
                password
            })

            if(data) {
                //@ts-expect-error need to fix "email is alredy exist" doesnt work
                if(data.error){
                    //@ts-expect-error need to fix "email is alredy exist" doesnt work
                    toast.error(data.error.message)
                    return
                }
                console.log(data)
                toast.success("Account has been created")
                setIsLogin(prev => !prev)
            }
        } catch(error) {
            //@ts-expect-error type problem
            const errorData = error.response?.data.message
            toast.error(errorData.toString())
        }
    }

    return (
        <div className='mt-40 flex flex-col items-center justify-center bg-slate-900 text-white'>
          <h1 className='text-center text-xl mb-10'>
            {isLogin ? 'Login' : 'Registration'}
          </h1>
          <form className='flex w-1/3 flex-col mx-auto gap-5'
            onSubmit={isLogin ? loginHandler : registrationHandler}
          >
            <input type='text' className='input' placeholder='Email'
             onChange={(event) => setEmail(event.target.value) }
                   value={email}
            />
            <input type='password' className='input' placeholder='Password'
              onChange={(event) => setPassword(event.target.value)}
                   value={password}
            />

            <button className='btn btn-green mx-auto'>Submit</button>
          </form>
          <div className='flex justify-center mt-5'>
            {isLogin ? (
              <button
                onClick={() => setIsLogin(prev => !prev)}
                className='text-slate-300 hover:text-white'>
                You don't have an account?
              </button>
            ) : (
              <button
                onClick={() => setIsLogin(prev => !prev)}
                className='text-slate-300 hover:text-white'>
                Already have an account?
              </button>
            )}
          </div>
        </div>
    );
};
