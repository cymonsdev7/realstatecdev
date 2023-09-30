import { GrInstagram } from "react-icons/gr"
import { ImWhatsapp } from "react-icons/im"
import { PiFacebookLogoBold } from "react-icons/pi"
import Logo from "../../svgs/Logo"

export const FooterTwo = () => {
  return (
    <div>

<footer className="bg-white">
    <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
                <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-400 xl:text-2xl">Inscreva-se para receber grandes imóveis</h1>

                <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                    <input id="email" type="text" className="px-4 py-2 bg-white border rounded-md focus:border-indigo-400 focus:bg-indigo-500 border-3 border-gray-400 focus:outline-none focus:text-white focus:ring focus:ring-opacity-40 focus:ring-indigo-300" placeholder="Seu Melhor Email..."/>

                    <button className="w-full hover:bg-indigo-500 hover:text-white bg-indigo-700 px-6 py-2.5 text-sm font-bold rounded-lg tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80">
                        Inscrever-me
                    </button>
                </div>
            </div>

            <div>
                <p className="font-semibold text-xl text-gray-500">Recursos</p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-indigo-700">Página Inicial</a>
                    <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-indigo-700">Quem somos nós</a>
                    <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-indigo-700">Nossa Filosofia</a>
                </div>
            </div>

            <div>
                <p className="font-semibold text-xl text-gray-500">Política & Privacidade</p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-indigo-700">Política e Privacidade</a>
                    <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-indigo-700">Seja um corretor Remax</a>
                    <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-indigo-700">Contato Remax</a>
                </div>
            </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-300"/>

        <div className="flex items-center justify-between">
            <a href="#" className="mt-7 w-44">
                <Logo/>
            </a>

            <div className="flex items-center -mx-2">
                <a href="#" className="mx-2 text-indigo-600 transition-colors duration-700 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
                 <ImWhatsapp size={19}/>
                </a>

                <a href="#" className="mx-2 text-indigo-600 transition-colors duration-700 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                <GrInstagram size={18}/>
                </a>

                <a href="#" className="mx-2 text-indigo-600 transition-colors duration-700 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
                <PiFacebookLogoBold size={22}/>
                </a>
            </div>
        </div>
    </div>
</footer>
    </div>
  )
}
