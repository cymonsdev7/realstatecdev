import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Logo from '../../svgs/Logo'
// import { FiLogIn } from "react-icons/fi";

import { TopHeader } from '../topheader'
import { FiLogIn } from 'react-icons/fi'
import DropDownClient from '../dropdowncliente'
import DropDownUserSigned from '../dropdownmenu'
import { TopHeaderTwo } from '../TopHeaderTwo'


export const Header = () => {
  const { signed, loadingAuth } = useContext(AuthContext)

  return (
    <>
        <TopHeader/>
         <TopHeaderTwo/>


          {!loadingAuth && signed &&
          <DropDownUserSigned/>
          }
          {!loadingAuth && !signed &&
          <DropDownClient/>
          }

    </>
  )
}
