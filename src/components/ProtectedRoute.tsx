import { FC, JSX } from 'react'
import { useAuth } from '../hooks/useAuth.ts'
import img from "../assets/shield-lock-line-icon.png"

interface Props { children: JSX.Element; }

export const ProtectedRoute: FC<Props> = ({ children }) => {
	const isAuth = useAuth()
	return <>
		{isAuth ? children : (
			<div className='flex flex-col justify-center items-center mt-20 gap-10'>
				<h1 className='text-2xl'>To view this page you must bo authorized</h1>
				<img src={img} alt='protected route'/>
			</div>
		)}
	</>
}