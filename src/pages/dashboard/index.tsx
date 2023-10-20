import { FaChartArea, FaBed, FaShower } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { ImWhatsapp } from 'react-icons/im'
import { MdPlace } from 'react-icons/md'
import { PiFacebookLogoBold } from 'react-icons/pi'
import { Container } from '../../components/container'
import { PanelHeader } from '../../components/panelHeader'
import { TbTrashXFilled } from 'react-icons/tb'

import { useEffect, useState, useContext } from 'react'
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { db, storage } from '../../services/firebaseConnection'
import { ref, deleteObject } from 'firebase/storage'
import { AuthContext } from '../../contexts/AuthContext'

interface PropertiesProps {
  id: string
  name: string
  adress: string
  price: string
  area: string
  bedrooms: string
  bathrooms: string
  nameBroker: string
  images: ImagePropertyProps[]
  imageBroker: string
  uid: string
}

interface ImagePropertyProps {
  name: string
  uid: string
  url: string
}

export const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [property, setProperty] = useState<PropertiesProps[]>([])
  const [houses, setHouses] = useState<PropertiesProps[]>([])
  const [places, setPlaces] = useState<PropertiesProps[]>([])
  const [aptos, setAptos] = useState<PropertiesProps[]>([])
  const [farms, setFarms] = useState<PropertiesProps[]>([])

  useEffect(() => {
    // FUNCTION LOADPROPERTIES
    function loadProperties() {
      if (!user?.uid) {
        return
      }
      const propertiesRef = collection(db, 'property')
      const queryRef = query(propertiesRef, where('uid', '==', user?.uid))

      getDocs(queryRef).then((snapshot) => {
        console.log(snapshot.docs)
        let listProperties = [] as PropertiesProps[]

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
            images: doc.data().images,
            imageBroker: doc.data().imageBroker,
            uid: doc.data().uid
          })
        })

        console.log(listProperties)
        setProperty(listProperties)
      })
    }

    // FUNCTION LOADPROPERTIES
    function loadHouses() {
      if (!user?.uid) {
        return
      }
      const propertiesRef = collection(db, 'houses')
      const queryRef = query(propertiesRef, where('uid', '==', user?.uid))

      getDocs(queryRef).then((snapshot) => {
        console.log(snapshot.docs)
        let listProperties = [] as PropertiesProps[]

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
            images: doc.data().images,
            imageBroker: doc.data().imageBroker,
            uid: doc.data().uid
          })
        })

        console.log(listProperties)
        setHouses(listProperties)
      })
    }




    // FUNCTION LOADPROPERTIES
    function loadAptos() {
      if (!user?.uid) {
        return
      }
      const propertiesRef = collection(db, 'apartamentos')
      const queryRef = query(propertiesRef, where('uid', '==', user?.uid))

      getDocs(queryRef).then((snapshot) => {
        console.log(snapshot.docs)
        let listProperties = [] as PropertiesProps[]

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
            images: doc.data().images,
            imageBroker: doc.data().imageBroker,
            uid: doc.data().uid
          })
        })

        console.log(listProperties)
        setAptos(listProperties)
      })
    }





    // FUNCTION LOADPROPERTIES
    function loadPlaces() {
      if (!user?.uid) {
        return
      }
      const propertiesRef = collection(db, 'lotes')
      const queryRef = query(propertiesRef, where('uid', '==', user?.uid))

      getDocs(queryRef).then((snapshot) => {
        console.log(snapshot.docs)
        let listProperties = [] as PropertiesProps[]

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
            images: doc.data().images,
            imageBroker: doc.data().imageBroker,
            uid: doc.data().uid
          })
        })

        console.log(listProperties)
        setPlaces(listProperties)
      })
    }



    // FUNCTION LOADPROPERTIES
    function loadFarms() {
      if (!user?.uid) {
        return
      }
      const propertiesRef = collection(db, 'rurais')
      const queryRef = query(propertiesRef, where('uid', '==', user?.uid))

      getDocs(queryRef).then((snapshot) => {
        console.log(snapshot.docs)
        let listProperties = [] as PropertiesProps[]

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
            images: doc.data().images,
            imageBroker: doc.data().imageBroker,
            uid: doc.data().uid
          })
        })

        console.log(listProperties)
        setFarms(listProperties)
      })
    }

    loadProperties()
    loadHouses()
    loadAptos()
    loadPlaces()
    loadFarms()
  }, [])

  async function handleDeleteProperty(prop: PropertiesProps) {
    const itemProperty = prop

    const docRef = doc(db, 'property', itemProperty.id)
    await deleteDoc(docRef)

    itemProperty.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`
      const imageRef = ref(storage, imagePath)

      try {
        await deleteObject(imageRef)
        setProperty(property.filter((proper) => proper.id !== itemProperty.id))
      } catch (error) {
        console.log('ERRO AO DELETAR ESSA IMAGEM...')
      }
    })
  }

  return (
    <Container>
      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Dash Destaques</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        {property.map((propert) => (
          <div
            key={propert.id}
            className="max-w-sm bg-white px-7 pt-7 mt-7 mb-7 mx-4 pb-2 rounded-xl shadow-lg
            transform hover:scale-105 transition duration-500"
          >
            <div className="relative">
              <div className=""></div>
              <button
                onClick={() => handleDeleteProperty(propert)}
                className="absolute cursor-pointer bg-indigo-700 w-10 h-10 rounded-full flex
                  items-center justify-center right-2 top-14 drop-shadow hover:bg-indigo-500 transition duration-700"
              >
                <TbTrashXFilled
                  title="Deletar Imagem!"
                  color="white"
                  size={20}
                />
              </button>
              <img
                className="w-full rounded-xl"
                src={propert.images[0].url}
                alt="Colors"
              />
              <p
                className="absolute top-0 bg-indigo-700 text-white font-semibold py-1 px-3
                  rounded-br-lg rounded-tl-lg"
              >
                {propert.price}
              </p>

              <button
                className="absolute hover:bg-indigo-700 hover:text-white transition duration-700 cursor-pointer top-0 right-0
                   bg-gray-100 text-indigo-700 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"
              >
                Detalhes
              </button>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <MdPlace />
              <h4>{propert.adress}</h4>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              {propert.name}
            </h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaChartArea size={20} />
                </span>
                <p>{propert.area}</p>
              </div>

              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaBed size={25} />
                </span>
                <p>{propert.bedrooms}</p>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaShower size={22} />
                </span>
                <p>{propert.bathrooms}</p>
              </div>
            </div>
            {/* BROKER NAME */}
            <div className="">
              <div className="flex gap-2 mt-4 items-center">
                <img
                  src={propert.imageBroker}
                  alt=""
                  className="rounded-full w-12 h-12 z-10"
                />
                <h3 className="bg-gray-100 flex items-center justify-cente h-9 px-7 -ml-5 rounded-lg ">
                  {propert.nameBroker}
                </h3>
                <div className="w-full flex items-center justify-evenly gap-7">
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer">
                    <ImWhatsapp size={19} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer insta_icon_broker">
                    <GrInstagram size={18} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer face_icon_broker">
                    <PiFacebookLogoBold size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <hr />




      {/* DASHBOARD CASAS*/}

      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Dash Casas</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        {houses.map((housess) => (
          <div
            key={housess.id}
            className="max-w-sm bg-white px-7 pt-7 mt-7 mb-7 mx-4 pb-2 rounded-xl shadow-lg
            transform hover:scale-105 transition duration-500"
          >
            <div className="relative">
              <div className=""></div>
              <button
                onClick={() => handleDeleteProperty(housess)}
                className="absolute cursor-pointer bg-indigo-700 w-10 h-10 rounded-full flex
                  items-center justify-center right-2 top-14 drop-shadow hover:bg-indigo-500 transition duration-700"
              >
                <TbTrashXFilled
                  title="Deletar Imagem!"
                  color="white"
                  size={20}
                />
              </button>
              <img
                className="w-full rounded-xl"
                src={housess.images[0].url}
                alt="Colors"
              />
              <p
                className="absolute top-0 bg-indigo-700 text-white font-semibold py-1 px-3
                  rounded-br-lg rounded-tl-lg"
              >
                {housess.price}
              </p>

              <button
                className="absolute hover:bg-indigo-700 hover:text-white transition duration-700 cursor-pointer top-0 right-0
                   bg-gray-100 text-indigo-700 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"
              >
                Detalhes
              </button>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <MdPlace />
              <h4>{housess.adress}</h4>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
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
                  className="rounded-full w-12 h-12 z-10"
                />
                <h3 className="bg-gray-100 flex items-center justify-cente h-9 px-7 -ml-5 rounded-lg ">
                  {housess.nameBroker}
                </h3>
                <div className="w-full flex items-center justify-evenly gap-7">
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer">
                    <ImWhatsapp size={19} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer insta_icon_broker">
                    <GrInstagram size={18} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer face_icon_broker">
                    <PiFacebookLogoBold size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <hr />






      {/* DASHBOARD APTOS*/}

      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Dash Apartamentos</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        {aptos.map((aptoss) => (
          <div
            key={aptoss.id}
            className="max-w-sm bg-white px-7 pt-7 mt-7 mb-7 mx-4 pb-2 rounded-xl shadow-lg
            transform hover:scale-105 transition duration-500"
          >
            <div className="relative">
              <div className=""></div>
              <button
                onClick={() => handleDeleteProperty(aptoss)}
                className="absolute cursor-pointer bg-indigo-700 w-10 h-10 rounded-full flex
                  items-center justify-center right-2 top-14 drop-shadow hover:bg-indigo-500 transition duration-700"
              >
                <TbTrashXFilled
                  title="Deletar Imagem!"
                  color="white"
                  size={20}
                />
              </button>
              <img
                className="w-full rounded-xl"
                src={aptoss.images[0].url}
                alt="Colors"
              />
              <p
                className="absolute top-0 bg-indigo-700 text-white font-semibold py-1 px-3
                  rounded-br-lg rounded-tl-lg"
              >
                {aptoss.price}
              </p>

              <button
                className="absolute hover:bg-indigo-700 hover:text-white transition duration-700 cursor-pointer top-0 right-0
                   bg-gray-100 text-indigo-700 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"
              >
                Detalhes
              </button>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <MdPlace />
              <h4>{aptoss.adress}</h4>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              {aptoss.name}
            </h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaChartArea size={20} />
                </span>
                <p>{aptoss.area}</p>
              </div>

              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaBed size={25} />
                </span>
                <p>{aptoss.bedrooms}</p>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaShower size={22} />
                </span>
                <p>{aptoss.bathrooms}</p>
              </div>
            </div>
            {/* BROKER NAME */}
            <div className="">
              <div className="flex gap-2 mt-4 items-center">
                <img
                  src={aptoss.imageBroker}
                  alt=""
                  className="rounded-full w-12 h-12 z-10"
                />
                <h3 className="bg-gray-100 flex items-center justify-cente h-9 px-7 -ml-5 rounded-lg ">
                  {aptoss.nameBroker}
                </h3>
                <div className="w-full flex items-center justify-evenly gap-7">
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer">
                    <ImWhatsapp size={19} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer insta_icon_broker">
                    <GrInstagram size={18} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer face_icon_broker">
                    <PiFacebookLogoBold size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <hr />






      {/* DASHBOARD LOTES*/}

      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Dash Lotes</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        {places.map((placess) => (
          <div
            key={placess.id}
            className="max-w-sm bg-white px-7 pt-7 mt-7 mb-7 mx-4 pb-2 rounded-xl shadow-lg
            transform hover:scale-105 transition duration-500"
          >
            <div className="relative">
              <div className=""></div>
              <button
                onClick={() => handleDeleteProperty(placess)}
                className="absolute cursor-pointer bg-indigo-700 w-10 h-10 rounded-full flex
                  items-center justify-center right-2 top-14 drop-shadow hover:bg-indigo-500 transition duration-700"
              >
                <TbTrashXFilled
                  title="Deletar Imagem!"
                  color="white"
                  size={20}
                />
              </button>
              <img
                className="w-full rounded-xl"
                src={placess.images[0].url}
                alt="Colors"
              />
              <p
                className="absolute top-0 bg-indigo-700 text-white font-semibold py-1 px-3
                  rounded-br-lg rounded-tl-lg"
              >
                {placess.price}
              </p>

              <button
                className="absolute hover:bg-indigo-700 hover:text-white transition duration-700 cursor-pointer top-0 right-0
                   bg-gray-100 text-indigo-700 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"
              >
                Detalhes
              </button>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <MdPlace />
              <h4>{placess.adress}</h4>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              {placess.name}
            </h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaChartArea size={20} />
                </span>
                <p>{placess.area}</p>
              </div>

              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaBed size={25} />
                </span>
                <p>{placess.bedrooms}</p>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaShower size={22} />
                </span>
                <p>{placess.bathrooms}</p>
              </div>
            </div>
            {/* BROKER NAME */}
            <div className="">
              <div className="flex gap-2 mt-4 items-center">
                <img
                  src={placess.imageBroker}
                  alt=""
                  className="rounded-full w-12 h-12 z-10"
                />
                <h3 className="bg-gray-100 flex items-center justify-cente h-9 px-7 -ml-5 rounded-lg ">
                  {placess.nameBroker}
                </h3>
                <div className="w-full flex items-center justify-evenly gap-7">
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer">
                    <ImWhatsapp size={19} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer insta_icon_broker">
                    <GrInstagram size={18} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer face_icon_broker">
                    <PiFacebookLogoBold size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <hr />






      {/* DASHBOARD RURAIS*/}

      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Dash Rurais</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        {farms.map((farmss) => (
          <div
            key={farmss.id}
            className="max-w-sm bg-white px-7 pt-7 mt-7 mb-7 mx-4 pb-2 rounded-xl shadow-lg
            transform hover:scale-105 transition duration-500"
          >
            <div className="relative">
              <div className=""></div>
              <button
                onClick={() => handleDeleteProperty(farmss)}
                className="absolute cursor-pointer bg-indigo-700 w-10 h-10 rounded-full flex
                  items-center justify-center right-2 top-14 drop-shadow hover:bg-indigo-500 transition duration-700"
              >
                <TbTrashXFilled
                  title="Deletar Imagem!"
                  color="white"
                  size={20}
                />
              </button>
              <img
                className="w-full rounded-xl"
                src={farmss.images[0].url}
                alt="Colors"
              />
              <p
                className="absolute top-0 bg-indigo-700 text-white font-semibold py-1 px-3
                  rounded-br-lg rounded-tl-lg"
              >
                {farmss.price}
              </p>

              <button
                className="absolute hover:bg-indigo-700 hover:text-white transition duration-700 cursor-pointer top-0 right-0
                   bg-gray-100 text-indigo-700 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg"
              >
                Detalhes
              </button>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <MdPlace />
              <h4>{farmss.adress}</h4>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              {farmss.name}
            </h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaChartArea size={20} />
                </span>
                <p>{farmss.area}</p>
              </div>

              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaBed size={25} />
                </span>
                <p>{farmss.bedrooms}</p>
              </div>
              <div className="flex space-x-1 items-center gap-1">
                <span>
                  <FaShower size={22} />
                </span>
                <p>{farmss.bathrooms}</p>
              </div>
            </div>
            {/* BROKER NAME */}
            <div className="">
              <div className="flex gap-2 mt-4 items-center">
                <img
                  src={farmss.imageBroker}
                  alt=""
                  className="rounded-full w-12 h-12 z-10"
                />
                <h3 className="bg-gray-100 flex items-center justify-cente h-9 px-7 -ml-5 rounded-lg ">
                  {farmss.nameBroker}
                </h3>
                <div className="w-full flex items-center justify-evenly gap-7">
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer">
                    <ImWhatsapp size={19} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer insta_icon_broker">
                    <GrInstagram size={18} />
                  </div>
                  <div className="hover:text-indigo-700 transition duration-700 cursor-pointer face_icon_broker">
                    <PiFacebookLogoBold size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <hr />
    </Container>
  )
}
