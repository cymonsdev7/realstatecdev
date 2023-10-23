import { Popover, Transition, Dialog, Disclosure } from "@headlessui/react"
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"
import { BsBuildingUp } from "react-icons/bs"
import { FaUserPlus } from "react-icons/fa"
import { GiHouse, GiTreehouse } from "react-icons/gi"
import { MdPlace, MdLogin, MdOutlineLogout } from "react-icons/md"
import { TfiMenuAlt } from "react-icons/tfi"
import { Link, NavLink } from "react-router-dom"

const callsToAction = [
  {
    name: 'Registrar',
    href: 'http://localhost:5173/register',
    icon: FaUserPlus
  },
  {
    name: 'Sair da Conta',
    href: 'http://localhost:5173/login',
    icon: MdOutlineLogout
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export const DropdownMenuCategory = () => {

  function classNames(arg0: string, arg1: string) {
    throw new Error("Function not implemented.")
  }

  return (
    <>
              <header className="bg-white w-full md:w-[33rem] shadow-md rounded-lg mt-4">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-7 lg:px-8"

        >

          <div className="hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"

            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-9 w-9 text-gray-700" aria-hidden="true" />
            </button>
          </div>

          <Popover.Group className="grid grid-cols-1 w-full gap-y-2 md:flex
          md:justify-center md:gap-x-2 items-center">
            <NavLink
              to="/todosimoveis"
              className="text-md font-semibold leading-6 border px-3 py-1 rounded-lg text-gray-900
               hover:text-white duration-250 delay-250 ease-in-out hover:bg-indigo-700 "
            >
              Todos
            </NavLink>
            <NavLink
              to="/propriedadescasas"
              className="text-md font-semibold leading-6  border px-3 py-1 rounded-lg text-gray-900
               hover:text-white duration-250 delay-250 ease-in-out hover:bg-indigo-700 "
            >
              Casas
            </NavLink>
            <NavLink
              to="/propriedadesapartamentos"
              className="text-md font-semibold leading-6  border px-3 py-1 rounded-lg text-gray-900
               hover:text-white duration-250 delay-250 ease-in-out hover:bg-indigo-700 "
            >
              Aptos
            </NavLink>
            <NavLink
              to="/propriedadeslotes"
              className="text-md font-semibold leading-6  border px-3 py-1 rounded-lg text-gray-900
               hover:text-white duration-250 delay-250 ease-in-out hover:bg-indigo-700 "
            >
              Lotes
            </NavLink>
            <NavLink
              to="/propriedadesrurais"
              className="text-md font-semibold leading-6  border px-3 py-1 rounded-lg text-gray-900
               hover:text-white duration-250 delay-250 ease-in-out hover:bg-indigo-700 "
            >
              Rurais
            </NavLink>
          </Popover.Group>


        </nav>



      </header>
    </>
  )
}
