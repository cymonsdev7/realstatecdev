import { Link } from 'react-router-dom'
import Logo from '../../svgs/Logo'
import { TopHeader } from '../topheader'
import { useLocation, useNavigate } from 'react-router-dom'

export const HeaderPrincipal = () => {
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
        <div className="header_principal">
          <ul className="flex justify-between items-center space-x-10">
            <li
              onClick={() => navigate('/')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Inicial
            </li>
            <li
              onClick={() => navigate('/sobre')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/sobre') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Sobre
            </li>
            <li
              onClick={() => navigate('/categorias')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMathRoute('/categorias') && 'text-indigo-800 border-b-red-700'
              }`}
            >
              Categorias
            </li>
            <li
              onClick={() => navigate('/contato')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent
              ${pathMathRoute('/contato') && 'text-indigo-800 border-b-red-700'}`}
            >
              Contato
            </li>
            {/* <li
              onClick={() => navigate('/login')}
              className={`py-3 cursor-pointer text-md font-semibold text-gray-500 border-b-[3px] border-b-transparent
              ${pathMathRoute('/login') && 'text-indigo-800 border-b-red-700'}`}
            >
              Login
            </li> */}
          </ul>
        </div>
      </header>
    </div>
  )
}
