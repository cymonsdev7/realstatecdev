import { FaFacebook } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { PiInstagramLogoFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Logo from '../svgs/Logo'

export const TopHeaderLandingPagesLeads = () => {
  return (
    <>
      <Link to='/'
        className="w-full h-20 bg-white border-b-2 flex items-center
        justify-center gap-2"
      >
       <div className="flex w-44 justify-center items-center">

       <Logo/>
       </div>

      </Link>
    </>
  )
}
