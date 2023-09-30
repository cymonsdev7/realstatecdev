import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const BreadCrumbClient = () => {
  return (
    <>
      <nav aria-label="Breadcrumb" className="flex breadcrumb_header">
        <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
          <Link to="/" className="flex items-center">
            <a
              href=""
              className="flex h-10 items-center gap-1.5 bg-gray-100 hover:text-white hover:rounded-lg
               hover:bg-indigo-700 px-4 transition duration-250 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>

              <span className="ms-1.5 text-md font-medium">
                {' '}
                Página Inicial{' '}
              </span>
            </a>
          </Link>

          <Link to="/sobre" className="flex items-center">
            <a
              href=""
              className="flex h-10 items-center gap-1.5 hover:text-white hover:rounded-lg hover:bg-indigo-700
               bg-gray-100 px-4 transition duration-250 ease-in-out"
            >
              <MdKeyboardDoubleArrowRight size={22} />

              <span className="ms-1.5 text-md font-medium"> Sobre Nós</span>
            </a>
          </Link>
          <Link to="/contato" className="flex items-center">
            <a
              href=""
              className="flex h-10 items-center gap-1.5 bg-gray-100 hover:text-white hover:rounded-lg
               hover:bg-indigo-700 px-4 transition duration-250 ease-in-out"
            >
              <MdKeyboardDoubleArrowRight size={22} />

              <span className="ms-1.5 text-md font-medium"> Contato</span>
            </a>
          </Link>
          <Link to="/login" className="flex items-center">
            <a
              href=""
              className="flex h-10 items-center gap-1.5 bg-gray-100 hover:text-white hover:rounded-lg
               hover:bg-indigo-700 px-4 transition duration-250 ease-in-out"
            >
              <MdKeyboardDoubleArrowRight size={22} />

              <span className="ms-1.5 text-md font-medium">Login</span>
            </a>
          </Link>
        </ol>
      </nav>
    </>
  )
}
