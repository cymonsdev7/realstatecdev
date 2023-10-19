import { FaFacebook } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { PiInstagramLogoFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export const TopHeader = () => {
  return (
    <>
      <div
        className="w-full h-14 bg-red-700 flex items-center
        justify-center gap-2 top_header"
      >
        <div className="flex items-center justify-center gap-2 w-full relative left-14">
          <h3 className="font-bold text-lg text-gray-50">
            <span className="relative -top-[0.1rem]">Seja Um Corretor </span>
            <span className="uppercase text-2xl">Re/Max</span>
          </h3>
          <Link to="/contato">
            <button
              className="bg-indigo-700 hover:bg-indigo-500 transition
            duration-700 text-white font-bold
             px-4 py-1 rounded-md uppercase"
            >
              Começar a Vender
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-4 mr-4 w-32 z-30">
          <a
            href="https://wa.me/message/4VSYAUGPWXNVG1"
            target="_blank"
          >
            <IoLogoWhatsapp
              className="text-white text-xl hover:bg-indigo-700 hover:text-green-500
            hover:rounded-full transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer"
            />
          </a>

          <a  href="https://www.instagram.com/remax.consult_1?utm_source=qr&r=nametag"
            target="_blank">
            <PiInstagramLogoFill
              className="text-white text-xl hover:bg-indigo-700 hover:text-purple-700
            hover:rounded-full transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer"
            />
          </a>

          <a  href="https://www.facebook.com/remax.consult/"
            target="_blank">
            <FaFacebook
              className="text-white text-xl hover:bg-indigo-700 hover:text-indigo-700
            hover:rounded-full transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer"
            />
          </a>
        </div>
      </div>
    </>
  )
}
