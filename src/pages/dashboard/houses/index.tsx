import { ChangeEvent, useContext, useState } from 'react'
import { Container } from '../../../components/container'
import { FiTrash, FiUpload } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { Input } from '../../../components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectCategory } from '../../../components/SelectCategory'
import { v4 as uuidv4 } from 'uuid'

import { storage, db } from '../../../services/firebaseConnection'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
  // deleteObject
} from 'firebase/storage'

import { AuthContext } from '../../../contexts/AuthContext'
import { BsTrashFill } from 'react-icons/bs'
import { addDoc, collection } from 'firebase/firestore'

const schemaHouses = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  adress: z.string().nonempty('O campo endereço é obrigatório'),
  price: z.string().nonempty('O preço é obrigatório'),
  area: z.string().nonempty('A área é obrigatória'),
  bedrooms: z.string().nonempty('O campo dormitórios é obrigatório'),
  bathrooms: z.string().nonempty('O campo banheiros é obrigatório'),
  cookrooms: z.string().nonempty('O campo cozinha é obrigatório'),
  garages: z.string().nonempty('O campo garagens é obrigatório'),
  nameBroker: z.string().nonempty('O nome do corretor é obrigatório'),
  imageBroker: z.string().nonempty('A imagem do corretor é obrigatória'),
  description: z.string().nonempty('A descrição é obrigatória'),
  categories: z.string().nonempty('A categoria é obrigatória')
})

type FormDataHouses = z.infer<typeof schemaHouses>

interface ImageHouseCategoryProps {
  uid: string
  name: string
  previewUrl: string
  url: string
}

export const Houses = () => {
  const { user } = useContext(AuthContext)
  const [category, setCategory] = useState('Casas')
  const [housesCategoryImages, setHousesCategoryImages] = useState<
    ImageHouseCategoryProps[]
  >([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormDataHouses>({
    resolver: zodResolver(schemaHouses),
    mode: 'onChange'
  })

  // Funciton handleFilesHousesCategory
  async function handleFilesHousesCategory(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const imageHousesCategory = e.target.files[0]
      await handleUploadHousesCategory(imageHousesCategory)
      if (
        imageHousesCategory.type === 'image/jpeg' ||
        imageHousesCategory.type === 'image/png'
      ) {
      } else {
        alert('envie uma imagem jpeg ou png!')
        return
      }
    }
  }

  // Funciton handleUploadHousesCategory
  async function handleUploadHousesCategory(image: File) {
    if (!user?.uid) {
      return
    }

    const currentUidHouseCategory = user?.uid
    const uidImageHousesCategory = uuidv4()

    const uploadRefHousesCategory = ref(
      storage,
      `images/${currentUidHouseCategory}/${uidImageHousesCategory}`
    )

    uploadBytes(uploadRefHousesCategory, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downLoadUrl) => {
        const imageItemHousesCategory = {
          name: uidImageHousesCategory,
          uid: currentUidHouseCategory,
          previewUrl: URL.createObjectURL(image),
          url: downLoadUrl
        }

        setHousesCategoryImages((images) => [
          ...images,
          imageItemHousesCategory
        ])
      })
    })
  }

  // Funciton onSubmit
  function onSubmit(data: FormDataHouses) {
    if(housesCategoryImages.length === 0){
      alert('Envie alguma imagem para proceguir')
      return
    }

    const housesCategoryListImages = housesCategoryImages.map(housesList => {
       return{
        uid: housesList.uid,
        name: housesList.name,
        url: housesList.url
       }
    })

    addDoc(collection(db, `houses`), {
      name: data.name,
      adress: data.adress,
      price: data.price,
      area: data.area,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      cookrooms: data.cookrooms,
      garages: data.garages,
      nameBroker: data.nameBroker,
      imageBroker: data.imageBroker,
      description: data.description,
      categories: data.categories,
      create: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: housesCategoryListImages

    })
    .then(() => {
      reset()
      console.log('CADASTRADO COM SUCESSO!')
      setHousesCategoryImages([])
    })
    .catch((error) => {
      console.log(error)
      console.log('ERRO AO CADASTRAR NO BANCO DE DADOS!')
    })
  }

  // Function handleDeleteImagesHouseCategory | deleta imagens do formulario
  async function handleDeleteImagesHouseCategory(
    itemDelet: ImageHouseCategoryProps
  ) {
    const imagePathDelete = `images/${itemDelet.uid}/${itemDelet.name}`

    const imageRefDelete = ref(storage, imagePathDelete)

    try {
      await deleteObject(imageRefDelete)
      setHousesCategoryImages(
        housesCategoryImages.filter(
          (houseCategoryImage) => houseCategoryImage.url !== itemDelet.url
        )
      )
    } catch (error) {
      console.log('Erro ao deletar imagem')
    }
  }

  return (
    <Container>
      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-red-500">Cadastrar</span> Casas
      </h1>

      {/* UPLOADS IMAGES */}
      <div
        className="w-full bg-white p-3 rounded-lg flex flex-col
         sm:flex-row items-center gap-2"
      >
        <button
          className="border-2 w-48 h-48 rounded-lg flex items-center
           justify-center cursor-pointer
           "
           >

          <div className="absolute cursor-pointer">
            <FiUpload size={37} />
          </div>

          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/"
              className="opacity-0 cursor-pointer"
              onChange={handleFilesHousesCategory}
            />
          </div>
        </button>

        {housesCategoryImages.map((itemUpImage) => (
          <div
            key={itemUpImage.name}
            className="w-full h-32 flex items-center justify-center relative"
          >
            {/* Button Delete Images */}
            <button
              className="absolute"
              onClick={() => handleDeleteImagesHouseCategory(itemUpImage)}
            >
              <BsTrashFill size={28} color="#fff" />
            </button>

            {/* Carregar Imagens dos Imoveis */}
            <img
              src={itemUpImage.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
              alt="images dos imoveis"
            />
          </div>
        ))}
      </div>

      <div
        className="w-full bg-white p-3 rounded-lg flex flex-col
         sm:flex-row items-center gap-2 mt-3 mb-44"
      >
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* Inputs Nome & Endereço */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Nome do Imóvel</p>
              <Input
                type="text"
                register={register}
                name="name"
                error={errors.name?.message}
                placeholder="Digite o nome do imóvel"
              />
            </div>
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Endereço</p>
              <Input
                type="text"
                register={register}
                name="adress"
                error={errors.adress?.message}
                placeholder="Digite o endereço"
              />
            </div>
          </div>

          {/* Inputs Preço & Área  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Preço</p>
              <Input
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="Digite o preço"
              />
            </div>
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Área Total</p>
              <Input
                type="text"
                register={register}
                name="area"
                error={errors.area?.message}
                placeholder="Digite a área toral"
              />
            </div>
          </div>

          {/* Inputs Dormitórios & Banheiros  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Dormitórios</p>
              <Input
                type="text"
                register={register}
                name="bedrooms"
                error={errors.bedrooms?.message}
                placeholder="Digite a quantidade de dormitórios"
              />
            </div>
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Banheiros</p>
              <Input
                type="text"
                register={register}
                name="bathrooms"
                error={errors.bathrooms?.message}
                placeholder="Digite a quantidade de banheiros"
              />
            </div>
          </div>

          {/* Inputs Cozinhas & Garagens  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Cozinhas</p>
              <Input
                type="text"
                register={register}
                name="cookrooms"
                error={errors.cookrooms?.message}
                placeholder="Digite a quantidade de cozinhas"
              />
            </div>
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Garagens</p>
              <Input
                type="text"
                register={register}
                name="garages"
                error={errors.garages?.message}
                placeholder="Digite a quantidade de garagens"
              />
            </div>
          </div>

          {/* Inputs Dormitórios & Banheiros  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Nome do Corretor</p>
              <Input
                type="text"
                register={register}
                name="nameBroker"
                error={errors.nameBroker?.message}
                placeholder="Digite o nome do corretor"
              />
            </div>
            <div className="mb-3 w-full">
              <p className="font-semibold mb-3">Imagem do corretor</p>
              <Input
                type="text"
                register={register}
                name="imageBroker"
                error={errors.imageBroker?.message}
                placeholder="Digite a imagem de perfil do corretor"
              />
            </div>
          </div>

          {/* Descrição do imóvel */}
          <div className="mb-3 w-full">
            <p className="font-semibold mb-3">Imagem do corretor</p>
            <textarea
              className="mb-2 w-full rounded-md h-24 px-2 border-2 border-gray-200"
              {...register('description')}
              name="description"
              id="description"
              placeholder="Digite a descrição do imóvel..."
            />
          </div>

          {/* Inputs Dormitórios & Banheiros  */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center md:grid-cols-2 gap-4">
          </div> */}
            <div className="w-full mb-8">
              <p className="mb-2 font-bold">Categoria do imóvel</p>
              <select
                className="mb-2 w-full rounded-md h-12 px-2 border-2 border-gray-200"
                {...register('categories')}
                name="categories"
                id="categories"
                placeholder="Escolha a categoria do imóvel..."
              >
                <option value="Casas">Casas</option>
                <option value="Apartamentos">Apartamentos</option>
                <option value="Lotes">Lotes</option>
                <option value="Rural">Rurais</option>
              </select>
              {errors.description && (
                <p className="mb-1 text-red-400">{errors.categories.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-700 text-white
              font-bold h-12 hover:bg-indigo-500 duration-150 delay-150 transition-all
              "
            >
              Cadastrar
            </button>
        </form>
      </div>
    </Container>
  )
}
