import { useEffect, useState } from 'react'
import { Container } from '../../components/container'
import {
  FaChartArea,
  FaBed,
  FaShower,
  FaSearch,
  FaMapMarkedAlt
} from 'react-icons/fa'
import { MdPlace } from 'react-icons/md'
import { ImWhatsapp } from 'react-icons/im'
import { GrInstagram, GrMapLocation } from 'react-icons/gr'

import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'

import { db } from '../../services/firebaseConnection'
import { Link } from 'react-router-dom'
import { SliderHome } from '../../components/sliderHome'
import { SectionSobreRemax } from '../../components/sectionsobre'
import { SliderHomeMobile } from '../../components/sliderhomemobile'
import { Contato } from '../contato'
import CategoriesChanges from '../../components/categorieschanges'

import { GiFarmTractor, GiHouse } from 'react-icons/gi'
import { BiArrowToRight, BiSolidCategory } from 'react-icons/bi'
import { BsBuildingUp, BsFillBuildingFill } from 'react-icons/bs'

import { PiBuildingsFill } from 'react-icons/pi'
import { boolean } from 'zod'

interface PropertyProps {
  id: string
  uid: string
  name: string
  adress: string
  area: string
  bedrooms: string
  bathrooms: string
  price: string | number
  imageBroker: string
  nameBroker: string
  images: PropertyImagesProps[]
  categories: string | number
}

interface PropertyImagesProps {
  name: string
  uid: string
  url: string
}

export function PropriedadesLotes() {
  const [property, setProperty] = useState<PropertyProps[]>([])
  const [houses, setHouses] = useState<PropertyProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [filterProperties, setFilterProperties] = useState('')

  useEffect(() => {
    loadProperties()
    loadHouses()
  }, [])

  // FUNCTION LOADPROPERTIES

  function loadProperties() {
    const propertiesRef = collection(db, 'lotes')
    const queryRef = query(propertiesRef, orderBy('create', 'desc'))

    getDocs(queryRef).then((snapshot) => {
      let listProperties = [] as PropertyProps[]

      snapshot.forEach((doc) => {
        listProperties.push({
          id: doc.id,
          name: doc.data().name,
          adress: doc.data().adress,
          price: doc.data().price,
          area: doc.data().area,
          bedrooms: doc.data().bedrooms,
          bathrooms: doc.data().bathrooms,
          nameBroker: doc.data().nameBroker,
          categories: doc.data().categories,
          images: doc.data().images,
          imageBroker: doc.data().imageBroker,
          uid: doc.data().uid
        })
      })

      setProperty(listProperties)
    })
  }

  // FUNCTION LOADPROPERTIES

  function loadHouses() {
    const propertiesRef = collection(db, 'lotes')
    const queryRef = query(propertiesRef, orderBy('create', 'desc'))

    getDocs(queryRef).then((snapshot) => {
      let listHouses = [] as PropertyProps[]

      snapshot.forEach((doc) => {
        listHouses.push({
          id: doc.id,
          name: doc.data().name,
          adress: doc.data().adress,
          price: doc.data().price,
          area: doc.data().area,
          bedrooms: doc.data().bedrooms,
          bathrooms: doc.data().bathrooms,
          nameBroker: doc.data().nameBroker,
          categories: doc.data().categories,
          images: doc.data().images,
          imageBroker: doc.data().imageBroker,
          uid: doc.data().uid
        })
      })

      setHouses(listHouses)
    })
  }

  // FUNCTION HANDLESEARCHPROPERTY /////////////////

  async function handleSearchProperty() {
    if (input === '') {
      loadProperties()
      return
    }

    setProperty([])
    setLoadImages([])

    let q = query(
      collection(db, 'lotes'),
      where('name', '>=', input.toUpperCase()),
      where('name', '<=', input.toUpperCase() + '/uf8ff')
    )

    const querySnapshot = await getDocs(q)

    let listProperties = [] as PropertyProps[]

    querySnapshot.forEach((doc) => {
      listProperties.push({
        id: doc.id,
        name: doc.data().name,
        adress: doc.data().adress,
        price: doc.data().price,
        area: doc.data().area,
        bedrooms: doc.data().bedrooms,
        bathrooms: doc.data().bathrooms,
        nameBroker: doc.data().nameBroker,
        categories: doc.data().categories,
        images: doc.data().images,
        imageBroker: doc.data().imageBroker,
        uid: doc.data().uid
      })
    })

    setProperty(listProperties)
    console.log(listProperties)
  }

  function handleImageLoad(id: string) {
    setLoadImages((previewImageLoad) => [...previewImageLoad, id])
  }

  return (
    <>
      <div className="w-full"></div>

      <Container>
        <div className="w-full items-center flex h-10 text-gray-500 rounded-lg font-medium gap-4 px-4 mb-4"></div>

        <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
          <span className="text-gray-500">Lotes</span> RE
          <span className="font-bold text-red-600 relative -top-1">/</span>
          MAX
        </h1>

        {/* <div className='px-4 mt-8'>
          <h3 className='font-semibold text-lg mb-4
           text-gray-700'>Escolha a categoria</h3>
          <select
            className="w-96 h-12 rounded-lg px-2 font-semibold
           focus:bg-indigo-700 focus:text-white text-indigo-700"
            onChange={(e) => setFilterProperties(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="casas">Casas</option>
            <option value="aptos">Aptos</option>
            <option value="lotes">Lotes</option>
            <option value="rurais">Rurais</option>
          </select>
        </div> */}

        <section className="grid grid-cols-1 mt-16 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-14">
          {houses.map((housess) => (
            <Link
              key={housess.id}
              to={`/detalheslotes/${housess.id}`}
              className="flex justify-center"
            >
              <div className="max-w-sm bg-white px-7 pt-7 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 -z-50">
                <div className="relative">
                  <div
                    className="w-full h-52 rounded-lg bg-gray-100"
                    style={{
                      display: loadImages.includes(housess.id)
                        ? 'none'
                        : 'block'
                    }}
                  ></div>
                  <img
                    className="w-full rounded-xl"
                    src={housess.images[0].url}
                    alt="Colors"
                    onLoad={() => handleImageLoad(housess.id)}
                    style={{
                      display: loadImages.includes(housess.id)
                        ? 'block'
                        : 'none'
                    }}
                  />
                  <p className="absolute top-0 bg-indigo-700 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                    {housess.price}
                  </p>
                  <button
                    className="absolute hover:bg-indigo-700 hover:text-white transition duration-700 cursor-pointer top-0 right-0 bg-gray-100
                          text-indigo-700 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"
                  >
                    Detalhes
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <MdPlace
                    size={32}
                    color="
                         #3d42c1"
                  />
                  <h4>{housess.adress}</h4>
                </div>
                <h1 className="mt-4 text-gray-800 text-xl font-bold cursor-pointer">
                  {housess.name}
                </h1>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-1 items-center gap-1">
                    <span>
                      <FaChartArea size={20} />
                    </span>
                    <p>{housess.area}</p>
                  </div>

                  <div className="flex space-x-1 items-center gap-1">
                    <span>
                      <FaBed size={25} />
                    </span>
                    <p>{housess.bedrooms}</p>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <span>
                      <FaShower size={22} />
                    </span>
                    <p>{housess.bathrooms}</p>
                  </div>
                </div>
                {/* BROKER NAME */}
                <div className="">
                  <div className="flex gap-2 mt-4 items-center">
                    <img
                      src={housess.imageBroker}
                      alt=""
                      className="rounded-full ring-2 ring-gray-400 w-12 h-12 z-10"
                    />
                    <h3 className="bg-gray-100 flex items-center justify-cente h-9 px-7 -ml-5 rounded-lg ">
                      {housess.nameBroker}
                    </h3>
                    <div className="w-full flex items-center justify-evenly gap-3">
                      <div className="hover:text-indigo-700 transition duration-700 cursor-pointer">
                        <ImWhatsapp size={19} />
                      </div>
                      <div className="hover:text-indigo-700 transition duration-700 cursor-pointer">
                        <GrInstagram size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
        <hr />

        <Contato />
      </Container>
    </>
  )
}
