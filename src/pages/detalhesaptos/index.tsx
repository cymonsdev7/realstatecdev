import { useEffect, useState } from 'react'
import { Container } from '../../components/container'
// import { FaBed, FaChartArea} from "react-icons/fa"
import { useNavigate, useParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
// import { MdPlace } from "react-icons/md"
// import { AiOutlinePaperClip } from "react-icons/ai"
import { MdDescription, MdPlace } from 'react-icons/md'
import { BsCheckAll } from 'react-icons/bs'
import { IoLogoUsd } from 'react-icons/io'
import { FaBed, FaChartArea, FaShower, FaWhatsapp } from 'react-icons/fa'
import { MdSoupKitchen } from 'react-icons/md'
import { BiSolidCarGarage } from 'react-icons/bi'

import { Swiper, SwiperSlide } from 'swiper/react'

import { register } from 'swiper/element/bundle'


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

interface PropertiesProps {
  id: string
  name: string
  adress: string
  price: string
  area: string
  bedrooms: string
  bathrooms: string
  cookrooms: string
  nameBroker: string
  images: ImagePropertyProps[]
  imageBroker: string
  whatsapp: string
  garages: string
  description: string
  uid: string
}

interface ImagePropertyProps {
  name: string
  uid: string
  url: string
}

export const DetalhesAptos = () => {
  const [sliderPerView, setSliderPerView] = useState<number>(2)
  const { id } = useParams()
  const [property, setProperty] = useState<PropertiesProps>()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProperty() {
      if (!id) {
        return
      }

      const docRef = doc(db, 'apartamentos', id)
      getDoc(docRef).then((snapshot) => {
        // if (!snapshot.data()) {
        //   navigate('/')
        // }

        setProperty({
          id: snapshot.id,
          name: snapshot.data()?.name,
          adress: snapshot.data()?.adress,
          price: snapshot.data()?.price,
          area: snapshot.data()?.area,
          bedrooms: snapshot.data()?.bedrooms,
          bathrooms: snapshot.data()?.bathrooms,
          cookrooms: snapshot.data()?.cookrooms,
          nameBroker: snapshot.data()?.nameBroker,
          images: snapshot.data()?.images,
          imageBroker: snapshot.data()?.imageBroker,
          whatsapp: snapshot.data()?.whatsapp,
          description: snapshot.data()?.description,
          garages: snapshot.data()?.garages,
          uid: snapshot.data()?.uid
        })
      })
    }
    loadProperty()
  }, [id])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1)
      } else {
        setSliderPerView(2)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Container>
      {property && (
        <Swiper
          slidesPerView={sliderPerView}
          spaceBetween={30}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper -z-10"
        >
          {property?.images.map((image) => (
            <SwiperSlide
              key={image.name}
              className="border-2 shadow-lg rounded-xl p-4 mb-4 border-white"
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-96 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {property && (
        <div className="bg-white px-8 rounded-lg py-1 shadow-md mb-7">
          <div className="px-4 sm:px-0 mt-7">
            <h3 className="text-3xl font-bold leading-7 text-indigo-800">
              Página de Detalhes
            </h3>
            <p className="mt-1 max-w-2xl text-md leading-7 tracking-wider text-gray-700">
              Informações completas do imóvel
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100 p-4 mb-7">
            <dl className="divide-y divide-gray-300">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <MdPlace size={20} color="#3d42c1" />
                  </span>
                  Endereço
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.adress}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <BsCheckAll size={25} color="#3d42c1" />
                  </span>
                  Título
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <IoLogoUsd size={22} color="#3d42c1" />
                  </span>
                  Preço
                </dt>
                <dd className="mt-1 text-2xl font-bold leading-6 tracking-tighter text-indigo-700 sm:col-span-2 sm:mt-0">
                  {property.price}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <FaChartArea size={20} color="#3d42c1" />
                  </span>
                  Área
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.area}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <FaBed size={22} color="#3d42c1" />
                  </span>
                  Domitórios
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.bedrooms}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <FaShower size={22} color="#3d42c1" />
                  </span>
                  Banheiros
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.bathrooms}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <MdSoupKitchen size={28} color="#3d42c1" />
                  </span>
                  Cozinhas
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.cookrooms}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <BiSolidCarGarage size={28} color="#3d42c1" />
                  </span>
                  Garagens
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.garages}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <MdDescription size={22} color="#3d42c1" />
                  </span>
                  Descrição
                </dt>
                <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.description}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="flex items-center gap-2 text-md font-bold leading-6 text-gray-900">
                  <span>
                    <img
                      className="rounded-full flex items-center mt-5 w-28 h-28 border-2 border-indigo-500"
                      src={property.imageBroker}
                      alt="Broker Image"
                    />
                  </span>
                </dt>
                <dd className="flex items-center ml-5 gap-2 mt-4 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="relative top-5 flex items-center gap-2 font-bold text-lg">
                    Corretor:{' '}
                    <span className="text-indigo-700">
                      {property.nameBroker}
                    </span>
                  </span>
                </dd>
              </div>
              <a
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=${property?.whatsapp}&text=Olá vi esse ${property?.name} e estou interessado!`}
                className="cursor-pointer rounded-lg font-bold hover:bg-green-400

     bg-green-500 w-full text-white flex items-center justify-center
     gap-2 my-7 h-12 transition-all ease-in-out duration-700"
              >
                <span>
                  <FaWhatsapp size={25} />
                </span>
                Falar com o corretor
              </a>
            </dl>
          </div>
        </div>

        // <main className="w-full bg-white rounded-lg p-7 my-4 shadow-sm">
        //       <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
        //           <h1 className="font-bold text-3xl text-gray-700">{property.name}</h1>
        //           <h1 className="font-bold text-3xl text-indigo-500">{property.price}</h1>
        //       </div>
        //      <div className="border-2 border-indigo-200"></div>

        //      <div className="w-full bg-white rounded-lg p-7 my-4 shadow-sm">

        //       {/* INÍCIO DIV CARDS-MINI */}
        //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        //          {/* ENDEREÇO DIV */}
        //         <div className="flex flex-col gap-4 items-center justify-between bg-indigo-200 p-4 rounded-lg">
        //           <div className="bg-gray-100 w-full text-center rounded-md p-1 flex flex-col">
        //             <p className="font-bold text-gray-500">Endereço</p>
        //           </div>
        //           <div className="flex gap-2 items-center">
        //               <MdPlace size={25} color='#3d42c1'/>
        //                <p>{property.adress}</p>
        //           </div>
        //         </div>

        //         {/* AREA DIV */}
        //         <div className="flex flex-col gap-4 items-center justify-between bg-indigo-200 p-4 rounded-lg">
        //           <div className="bg-gray-100 w-full text-center rounded-md p-1 flex flex-col">
        //             <p className="font-bold text-gray-500">Área</p>
        //           </div>
        //           <div className="flex gap-2 items-center">
        //           <FaChartArea size={25} color='#3d42c1'/>
        //               <p>{property.area}</p>
        //           </div>
        //         </div>

        //          {/* BEDROOMS DIV */}
        //         <div className="flex flex-col gap-4 items-center justify-between
        //            bg-indigo-200 p-4 rounded-lg">
        //            <div className="bg-gray-100 w-full text-center rounded-md p-1 flex flex-col">
        //              <p className="font-bold text-gray-500">Dormitórios</p>
        //            </div>
        //            <div className="flex gap-2 items-center">
        //               <FaBed size={28} color='#3d42c1'/>
        //               <p>{property.bedrooms}</p>
        //            </div>
        //         </div>

        //         {/* BATHROOMS DIV */}
        //         <div className="flex flex-col gap-4 items-center justify-between
        //            bg-indigo-200 p-4 rounded-lg">
        //            <div className="bg-gray-100 w-full text-center rounded-md p-1 flex flex-col">
        //              <p className="font-bold text-gray-500">Banheiros</p>
        //            </div>
        //            <div className="flex gap-2 items-center">
        //               <FaBed size={28} color='#3d42c1'/>
        //               <p>{property.bathrooms}</p>
        //            </div>
        //         </div>

        //         {/* BATHROOMS DIV */}
        //         <div className="flex flex-col gap-4 items-center justify-between
        //            bg-indigo-200 p-4 rounded-lg">
        //            <div className="bg-gray-100 w-full text-center rounded-md p-1 flex flex-col">
        //              <p className="font-bold text-gray-500">Cozinhas</p>
        //            </div>
        //            <div className="flex gap-2 items-center">
        //               <FaBed size={28} color='#3d42c1'/>
        //               <p>{property.cookrooms}</p>
        //            </div>
        //         </div>

        //         {/* BATHROOMS DIV */}
        //         <div className="flex flex-col gap-4 items-center justify-between
        //            bg-indigo-200 p-4 rounded-lg">
        //            <div className="bg-gray-100 w-full text-center rounded-md p-1 flex flex-col">
        //              <p className="font-bold text-gray-500">Garagens</p>
        //            </div>
        //            <div className="flex gap-2 items-center">
        //               <FaBed size={28} color='#3d42c1'/>
        //               <p>{property.garages}</p>
        //            </div>
        //         </div>

        //         {/* FECHAMENTO DIV CARDS-MINI */}
        //       </div>
        //         {/* INICIO SEÇÃO DESCRIÇÃO */}
        //         <div className="w-full p-4 bg-indigo-200 mt-4 rounded-lg">
        //         <div className="flex flex-col gap-4 items-center justify-between
        //            bg-indigo-200 p-4 rounded-lg">
        //            <div className="bg-gray-100 w-full text-center rounded-md p-1 flex flex-col">
        //              <p className="font-bold text-gray-500">Descrição</p>
        //            </div>
        //            <div className="flex gap-2 items-center">

        //               <p>{property.description}</p>
        //            </div>
        //         </div>
        //         </div>

        //      </div>
        // </main>
      )}
    </Container>
  )
}
