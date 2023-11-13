import { Link } from 'react-router-dom'
import { Container } from '../../components/container'
import Logo from '../../svgs/Logo'
import {RiWhatsappFill} from 'react-icons/ri'
import { Header } from '../../components/header'

export const ThankYou = () => {
  return (
    <>
      <Header/>
      <Container>
        <a
          target='_blank'
          href='https://api.whatsapp.com/message/4VSYAUGPWXNVG1?autoload=1&app_absent=0'
          className="flex flex-col items-center
         w-full h-screen gap-2 mt-28"
        >
          {/* <div className="w-44">
            <Logo />
          </div> */}
          <h1 className="text-7xl font-semibold
           text-gray-700">Obrigado!</h1>
           <p className='font-semibold text-gray-500
            text-lg
           '>Entraremos em contato com você!</p>
           <button className='flex items-center gap-2
            bg-none ring-1 ring-gray-700
             px-12 py-2 rounded-md hover:text-white font-semibold
              mt-4 hover:bg-green-700 text-gray-700
           '>
            Whatsapp
            <RiWhatsappFill size={22}/>
           </button>
        </a>


      </Container>
    </>
  )
}
