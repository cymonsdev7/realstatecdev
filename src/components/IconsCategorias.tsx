import {GiHouse, GiFarmTractor} from 'react-icons/gi'
import {BsFillBuildingsFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import { ReactComponentElement, ReactNode } from 'react'

interface IconsProps {
  id: ReactNode
}

export const IconsCategorias = ({id}: IconsProps) => {
   switch(id){
    case 'Casas':
     return <GiHouse/>
    case 'Aptos':
     return <BsFillBuildingsFill/>
    case 'Lotes':
     return <MdLocationOn/>
    case 'Rurais':
     return <GiFarmTractor/>
     default:
      break
   }
}
