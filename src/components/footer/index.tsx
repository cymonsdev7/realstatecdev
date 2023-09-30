
import { GrInstagram } from "react-icons/gr"
import { ImWhatsapp } from "react-icons/im"
import { PiFacebookLogoBold } from "react-icons/pi"
import LogoFooter from "../../svgs/LogoFooter"


export const Footer = () => {
  return (
    <>
  <div className="w-full max-w-7xl mx-auto mt-4">

	<footer className="p-4 h-80 shadow md:px-6 md:py-8 bg-indigo-700">
		<div className="sm:flex sm:items-center sm:justify-between">
			<a href="#" target="_blank" className="flex items-center mb-4 sm:mb-0 mt-5">
				<LogoFooter/>
			</a>
			<ul className="flex flex-wrap items-center mb-6 sm:mb-0">
				<li>
					<a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Início</a>
				</li>
				<li>
					<a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Sobre</a>
				</li>
				<li>
					<a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Contato</a>
				</li>
			</ul>
		</div>
		<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-500 lg:my-8" />
		<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com" target="_blank" className="hover:underline">Real State Pro™</a>. Todos os Direitos Reservados.
    </span>

    <div className="w-full">
        <div className="w-full flex items-center justify-center mt-4 text-gray-400 gap-7">

            <div className="hover:text-gray-100 transition duration-700 cursor-pointer">
            <ImWhatsapp size={19}/>
            </div>
            <div className="hover:text-gray-100 transition duration-700 cursor-pointer">
           <GrInstagram size={18}/>
            </div>
           <div className="hover:text-gray-100 transition duration-700 cursor-pointer">
            <PiFacebookLogoBold size={22}/>
           </div>

       </div>
    </div>
	</footer>

</div>
    </>
  )
}
