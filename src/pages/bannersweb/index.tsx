import { useContext, useState } from 'react'
import { ChangeEvent } from 'react'
import { FiTrash, FiUpload } from 'react-icons/fi'
import { Container } from '../../components/container'


import { useForm } from 'react-hook-form'
import { Input } from '../../components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthContext } from '../../contexts/AuthContext'
import { v4 as uuidv4 } from 'uuid'

import { storage, db } from '../../services/firebaseConnection'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
  // deleteObject
} from 'firebase/storage'

import { addDoc, collection } from 'firebase/firestore'

const schema = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  imageSlider: z.string().nonempty('A imagem do corretor é obrigatória'),
  description: z.string().nonempty('A descrição é obrigatória'),
  categories: z.string().nonempty('A categoria é obrigatória')
})

type FormData = z.infer<typeof schema>

interface ImageProps {
  uid: string
  name: string
  previewUrl: string
  url: string
}

export const SlidersRegister = () => {
  const { user } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const [propertyImages, setPropertyImages] = useState<ImageProps[]>([])

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return
    }

    const currentUid = user?.uid
    const uidImage = uuidv4()

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downLoadUrl) => {
        console.log('URL DE ACESSO DA FOTO', downLoadUrl)
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downLoadUrl
        }

        setPropertyImages((images) => [...images, imageItem])
      })
    })
  }

  function onSubmit(data: FormData) {
    if(propertyImages.length === 0){
      alert('Carregue alguma imagem!')
      return
    }

    const propertyListImages = propertyImages.map((slidersImg) => {
      return {
        uid: slidersImg.uid,
        name: slidersImg.name,
        url: slidersImg.url
      }
    })

    addDoc(collection(db, 'sliders'), {
      name: data.name.toUpperCase(),
      imageSlider: data.imageSlider,
      description: data.description,
      categories: data.categories,
      create: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: propertyListImages
    })
      .then(() => {
        reset()
        setPropertyImages([])
        console.log('CADASTRADO COM SUCESSO!')
      })
      .catch((error) => {
        console.log(error)
        console.log('ERRO AO CADASTRAR NO BANCO')
      })
  }

  async function handleDeleteImage(item: ImageProps) {
    const imagePath = `images/${item.uid}/${item.name}`

    const imageRef = ref(storage, imagePath)

    try {
      await deleteObject(imageRef)
      setPropertyImages(
        propertyImages.filter((proprerty) => proprerty.url !== item.url)
      )
    } catch (err) {
      console.log('ERRO AO DELETAR IMAGEM')
    }
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        await handleUpload(image)
      } else {
        alert('Faça upload de uma imagem jpeg ou png!')
      }
    }
  }
  return (
    <Container>
      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Cadastrar Sliders</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>

      <div className="w-full shadow-sm bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer
         border-gray-700 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
        </button>

        {propertyImages.map((item) => (
          <div
            key={item.name}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <button
              className="absolute"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash size={30} color="white" />
            </button>

            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
              alt="Foto do imóvel"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white shadow-md p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid md:grid-cols-2 items-center gap-4">
            <div className="mb-3">
              <p className="mb-2 font-bold">Nome do imóvel</p>
              <Input
                type="text"
                register={register}
                name="name"
                error={errors.name?.message}
                placeholder="Nome do imóvel..."
              />
            </div>
          </div>



          <div className="w-full">
            <p className="mb-2 font-bold">Descrição do imóvel</p>
            <textarea
              className="mb-2 w-full rounded-md h-24 px-2 border-2 border-gray-200"
              {...register('description')}
              name="description"
              id="description"
              placeholder="Digite a descrição do imóvel..."
            />
            {errors.description && (
              <p className="mb-1 text-red-400">{errors.description.message}</p>
            )}
          </div>
          <div className="w-full">
            <p className="mb-2 font-bold">Categoria do imóvel</p>
            <select
              className="mb-2 w-full rounded-md h-12 px-2 border-2 border-gray-200"
              {...register('categories')}
              name="categories"
              id="categories"
              placeholder="Escolha a categoria do imóvel..."
            >
              <option value="">Selecione a Categoria</option>
              <option value="Casas">Casas</option>
              <option value="Apartamentos">Apartamentos</option>
              <option value="Lotes">Lotes</option>
              <option value="Rural">Rural</option>
            </select>
            {errors.description && (
              <p className="mb-1 text-red-400">{errors.categories.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md h-12 relative top-[0.1rem] hover:bg-indigo-500
               transition duration-700 mt-7 cursor-pointer bg-indigo-700 text-white
               font-medium"
          >
            Cadastrar
          </button>
        </form>
      </div>
      <br />
    </Container>
  )
}
