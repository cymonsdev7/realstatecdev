import { MdDescription, MdPlace, MdSoupKitchen } from 'react-icons/md'
import { FormLandingPageLeads } from './FormLandingPageLeads'
import { BsCheckAll } from 'react-icons/bs'
import { FaBed, FaChartArea, FaShower } from 'react-icons/fa'
import { BiSolidCarGarage } from 'react-icons/bi'
import { IoIosArrowDown, IoLogoUsd } from "react-icons/io";


export const PropertySellLandingPage = () => {
  return (
    <>
      <div className="bg-white">
        <div
          className="mx-auto grid grid-cols-1 items-center
        px-4 lg:grid-cols-2 lg:px-8 gap-28 p-14"
        >

          <div className="">
            <FormLandingPageLeads />
          </div>

          <div>
          <div className='w-full flex justify-center lg:relative lg:-top-28 text-indigo-700 text-4xl animate-bounce'>
            <IoIosArrowDown/>
          </div>
            <h2 className="text-3xl text-center lg:relative lg:-top-32 lg:text-left font-bold tracking-tight text-gray-900 sm:text-4xl">
              Detalhes do{' '}
              <span className="text-indigo-700 font-bold">Imóvel</span>
            </h2>


            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:relative lg:-top-36 sm:gap-y-16 lg:gap-x-8">
              {/* ENDEREÇO */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <MdPlace size={25} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">
                    Endereço do Imóvel
                  </dt>
                </div>
                <dd className="mt-2 text-sm text-gray-500">
                  Jornalista Libano Galante , 101 - Industrial , Araguari ,
                  Minas Gerais
                </dd>
              </div>

              {/* PREÇO DO IMOVEL */}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <IoLogoUsd size={22} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">
                    Preço do Imóvel
                  </dt>
                </div>
                <dd className="mt-2 px-2 text-sm font-bold text-indigo-700">
                  R$590.000,00
                </dd>
              </div>

              {/* AREA DO IMOVEL */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <FaChartArea size={20} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">Área</dt>
                </div>
                <dd className="mt-2 text-sm text-gray-500">300 m2</dd>
              </div>

              {/* DORMITORIOS */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <FaBed size={22} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">
                    Dormitórios
                  </dt>
                </div>
                <dd className="mt-2 text-sm text-gray-500">3</dd>
              </div>

              {/* BANHEIROS */}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <FaShower size={22} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">
                    Banheiros
                  </dt>
                </div>
                <dd className="mt-2 text-sm text-gray-500">5</dd>
              </div>

              {/* COZINHAS */}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <MdSoupKitchen size={28} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">
                    Cozinhas
                  </dt>
                </div>
                <dd className="mt-2 text-sm text-gray-500">1</dd>
              </div>

              {/* GARAGENS */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <BiSolidCarGarage size={28} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">
                    Garagens
                  </dt>
                </div>
                <dd className="mt-2 text-sm text-gray-500">Para 2 Carros</dd>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1">
                  <span>
                    <MdDescription size={22} color="#3d42c1" />
                  </span>
                  <dt className="font-medium text-lg text-gray-900">
                    Descrição
                  </dt>
                </div>
                <dd className="mt-2 text-sm text-gray-500">
                  Casa com 3 quartos sendo 2 suite, e sendo master e com closet.
                  Os quartos todos possuem armários embutidos, 1 sala bem ampla,
                  1 cômodo que pode ser usado como quarto ou escritório que
                  compartilha uma área de luz com a sala. 1 sala de jantar ,
                  banheiro social, cozinha com armários planejados, área de
                  serviço, 2 cômodos que pode ser usado como despejo ou quarto,
                  banheiro com box, área gourmet com churrasqueira, lavanderia,
                  garagem para 2 carros.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}
