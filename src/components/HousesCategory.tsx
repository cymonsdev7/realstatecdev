import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FaChartArea, FaBed, FaShower } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { ImWhatsapp } from 'react-icons/im'
import { MdPlace } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { db } from '../services/firebaseConnection'
import { SliderHome } from './sliderHome'
import { SliderHomeMobile } from './sliderhomemobile'
import { SobreNos } from '../pages/sobre'
import { ContactThree } from './contatothree'

export const HousesCategory = () => {
  const [property, setProperty] = useState([])
  const [houses, setHouses] = useState([])
  const [filterProperties, setFilterProperties] = useState('')
  const [loadImages, setLoadImages] = useState<string[]>([])

  const getHouses = async () => {
    const propertyRef = collection(db, 'houses')
    const q = query(propertyRef, orderBy('create', 'desc'))
    const adDocs = await getDocs(q)
    let house = []
    adDocs.forEach((doc) => house.push({ ...doc.data(), id: doc.id }))
    setHouses(house)
  }

  useEffect(() => {
    getHouses()
  }, [])
  console.log()

  function handleImageLoad(id: string) {
    setLoadImages((previewImageLoad) => [...previewImageLoad, id])
  }

  return (
    <>
      <section className="grid grid-cols-1 mt-16 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-14">
        {houses.map((housess) => (
          <Link
            key={housess.id}
            to={`/details/${housess.id}`}
            className="flex justify-center"
          >
            <div className="max-w-sm bg-white px-7 pt-7 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 -z-50">
              <div className="relative">
                <div
                  className="w-full h-52 rounded-lg bg-gray-100"
                  style={{
                    display: loadImages.includes(housess.id) ? 'none' : 'block'
                  }}
                ></div>
                <img
                  className="w-full rounded-xl"
                  src={housess.images[0].url}
                  alt="Colors"
                  onLoad={() => handleImageLoad(housess.id)}
                  style={{
                    display: loadImages.includes(housess.id) ? 'block' : 'none'
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
    </>
  )
}
