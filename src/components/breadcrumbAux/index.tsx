import { MdKeyboardArrowRight } from "react-icons/md";
import {BiSolidLogIn} from 'react-icons/bi'
import {HiHome} from 'react-icons/hi'
import { Link } from "react-router-dom";

export const BreadCrumbAux = () => {
  return (
    <div className="w-full flex justify-end breadcrumb_header_cliente">
            <ol className="flex items-center gap-4 rounded-md bg-white text-gray-500 px-3 py-1 ring-1 ring-gray-200">
              <Link to='/'>
                <div className="flex items-center gap-1 text-md font-medium transition-all
                 duration-300 hover:text-indigo-700">
                  <HiHome color='#3d42c1'/>
                  {/* <svg
                    className="mr-2.5 h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg> */}
                  <a href="#">Home </a>
                </div>
              </Link>
              <Link to='/sobre' className="inline-flex">
                <div className="flex items-center gap-2 text-md font-medium transition-all duration-300
                 hover:text-indigo-700">
                  <MdKeyboardArrowRight size={27} color='#3d42c1' />
                  {/* <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg> */}
                  <a href="">Sobre Nós</a>
                </div>
              </Link>

              <Link to='/contato' className="inline-flex">
                <div className="flex items-center gap-2 text-md font-medium transition-all duration-300 hover:text-indigo-700">
                  <svg
                    className="h-3 w-3 text-red-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a href=""> Contato </a>
                </div>
              </Link>
              <Link to='/login' className="inline-flex">
                <div className="flex cursor-pointer items-center font-bold gap-1 text-sm transition-all
                 duration-300 hover:text-gray-700 text-indigo-700 uppercase">
                  <BiSolidLogIn size={22}/>
                  {/* <svg
                    className="mx-1 h-3 w-3 text-red-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg> */}
                  Login
                </div>
              </Link>
            </ol>
          </div>

  )
}
