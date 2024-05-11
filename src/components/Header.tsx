import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth.ts'
import { useDispatch } from 'react-redux'
import { logout } from '../store/user/userSlice.ts'
import { removeToken } from '../helper/localstorage.helper.ts'
import { toast } from 'react-toastify'
export const Header = () => {

	const isAuth = useAuth()
	const dispatch  = useDispatch()
	const navigate = useNavigate()
	const logoutHandler = () => {
		dispatch(logout())
		removeToken('token')
		toast.success('Logged out')
		navigate('/')
	}

	return (
		<header className="flex items-center bg-slate-800 backdrop-blur-sm shadow-sm p-4">
			<Link to='/'>
				<FaBtc size={20} />
			</Link>

			{isAuth && (
				<nav className="mr-10 ml-auto">
					<ul className='flex items-center gap-5'>
						<li>
							<NavLink to='/' className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Home</NavLink>
						</li>
						<li>
							<NavLink to='/transactions' className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Transactions</NavLink>
						</li>
						<li>
							<NavLink to='/categories' className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Categories</NavLink>
						</li>
					</ul>
				</nav>

			)}
			{
				isAuth ? (
					<button onClick={logoutHandler} className='btn btn-red'>
						<span>Log Out</span>
						<FaSignOutAlt />
					</button>
				) : (
					<Link to='auth' className='ml-auto py-2 text-white/50 hover:text-white'>
						Log In / Sign In
					</Link>
				)
			}
		</header>
	)
}
