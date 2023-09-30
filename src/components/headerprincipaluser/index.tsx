import { Link } from 'react-router-dom'
import Logo from '../../svgs/Logo'
import { TopHeader } from '../topheader'
import { useLocation, useNavigate } from 'react-router-dom'

export const HeaderPrincipalUsers = () => {
  const location = useLocation()
  const navigate = useNavigate()
  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <div className="sticky top-0 z-50">

      <header className=" flex justify-between items-center px-7 max-w-7xl mx-auto">

        <div className='header_principal_user'>
          <ul className="flex justify-between space-x-10">
            <li
              onClick={() => navigate('/')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Inicial
            </li>
            <li
              onClick={() => navigate('/dashboard')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/dashboard') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Dashboard
            </li>
            <li
              onClick={() => navigate('/dashboard/new')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/dashboard/new') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Imóveis
            </li>
            <li
              onClick={() => navigate('/cadastrosliders')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/cadastrosliders') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Sliders
            </li>
            <li
              onClick={() => navigate('/login')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/login') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Sair
            </li>

          </ul>
        </div>
      </header>
    </div>
  )
}
