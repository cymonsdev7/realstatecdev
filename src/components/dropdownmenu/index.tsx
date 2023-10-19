import { Fragment, useContext, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  CursorArrowRaysIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import {GiHouse, GiTreehouse} from 'react-icons/gi'
import {BsBuildingUp} from 'react-icons/bs'
import {MdLogin, MdPlace, MdOutlineLogout} from 'react-icons/md'
import {FaUserPlus} from 'react-icons/fa'
import Logo from '../../svgs/Logo'


const products = [
  { name: 'Casas', description: 'Casas com os melhores preços do mercado', href: 'http://localhost:5173/casas', icon: GiHouse },
  { name: 'Apartamentos', description: 'Apartamentos com toda infraestrutura', href: 'http://localhost:5173/apartamentos', icon: BsBuildingUp },
  { name: 'Lotes', description: 'Lotes prontos para construção', href: 'http://localhost:5173/lotes', icon: MdPlace },
  { name: 'Rurais', description: 'Chácaras e fazendas', href: 'http://localhost:5173/rurais', icon: GiTreehouse  },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Registrar', href: 'http://localhost:5173/register', icon: FaUserPlus },
  { name: 'Sair da Conta', href: 'http://localhost:5173/login', icon: MdOutlineLogout },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDownUserSigned() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { signed, loadingAuth } = useContext(AuthContext)

  return (
    <>

    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to='/' className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FremaxLOgo.png?alt=media&token=65beb01f-c413-4c7c-9d8c-ccc3e3e62cef&_gl=1*hh4sxh*_ga*OTc3NTQxNzI0LjE2OTIwMzYwNTE.*_ga_CW55HF8NVT*MTY5NzU3NzUyNS4xMDAuMS4xNjk3NTgwNzYzLjI5LjAuMA.." alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-9 w-9 text-gray-700" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
        <Link to='/' className="text-md font-semibold leading-6 text-gray-900 hover:text-indigo-700 duration-250 delay-250 ease-in-out">
            Início
          </Link>
        <Link to='/dashboard' className="text-md font-semibold leading-6 text-gray-900 hover:text-indigo-700 duration-250 delay-250 ease-in-out">
            Dashboard
          </Link>

          <Link to='/dashboard/new' className="text-md font-semibold leading-6 text-gray-900 hover:text-indigo-700 duration-250 delay-250 ease-in-out">
            Imóveis
          </Link>
          <Link to='/cadrastrosliders' className="text-md font-semibold leading-6 text-gray-900 hover:text-indigo-700 duration-250 delay-250 ease-in-out">
            Sliders
          </Link>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-md outline-none font-semibold leading-6 text-gray-900 hover:text-indigo-700 duration-250 delay-250 ease-in-out">
              Categorias
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl
               bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>


        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to='/login' className="flex items-center text-md font-semibold leading-6 text-gray-900 hover:text-indigo-700 duration-250 delay-250 ease-in-out">
            Sair <span aria-hidden="true"><MdLogin size={25}/></span>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-14 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2F45bb4743-78b5-4935-a129-895dd04fcd52?alt=media&token=4b1dfe3c-0ff7-4f97-bc03-5a647ea0c9a1"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fechar Menu</span>
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-700 hover:text-white">
                        Categorias
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-red-600 hover:text-white"
                          >
                            &rarr;
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link to='/'
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-700 hover:text-white"
                >
                  Página Inicial
                </Link>
                <Link to='/dashboard'
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-700 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link to='/dashboard/new'
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-700 hover:text-white"
                >
                  Imóveis
                </Link>
                <Link to='/cadastrosliders'
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-700 hover:text-white"
                >
                  Sliders
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to='/login'
                  className="flex items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-700 hover:text-white"
                >
                  Sair da Conta <span aria-hidden="true"><MdLogin size={25}/></span>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
    </>
  )
}
