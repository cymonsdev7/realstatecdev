import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'
import { IconsCategorias } from './IconsCategorias'


export const SelectCategory = ({category, setCategory}) => {

  const [showSelect, setShowSelect] = useState(false)


  const categoriesHouses = [
    { id: 'casas', text: 'Casas' },
    { id: 'aptos', text: 'Aptos' },
    { id: 'lotes', text: 'Lotes' },
    { id: 'rurais', text: 'Rurais' },
  ]

  const handleClick = (e) => {
    setCategory(e.currentTarget.dataset.valor)
  }

  return (

    <>

    <section
      onClick={() => setShowSelect(!showSelect)}
      className="cursor-pointer bg-white border-2 relative h-12 w-full
      px-0 py-[1rem] text-md text-center flex items-center transition-all ease-in-out duration-150
       delay-150  hover:text-gray-500 rounded-lg mb-6
       "
       >

      <div
        className="w-full font-semibold uppercase flex items-center
        justify-between mx-4"
      >
        {category} <FaAngleDown size={22} />

        {showSelect &&

        <div
          className=" bg-white absolute top-20 left-0 w-full rounded-lg
          max-h-72 overflow-y-auto
         "
        >
         {categoriesHouses.map((categoryHouse) => {
          return <div
          className='p-[0.7rem] border-[1px] flex hover:bg-indigo-700 hover:text-white'
          key={categoryHouse.id}
          onClick={handleClick}
          data-valor={categoryHouse.id}
          >
          <IconsCategorias id={categoryHouse.id}/>
          {categoryHouse.text}
        </div>
         })}
        </div>
        }
      </div>
    </section>
    </>
  )
}
