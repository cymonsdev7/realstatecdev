import { useContext, useState } from "react"
import { ChangeEvent} from "react"
import { FiTrash, FiUpload } from "react-icons/fi"
import { Container } from "../../../components/container"
import { PanelHeader } from "../../../components/panelHeader"

import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthContext } from "../../../contexts/AuthContext"
import {v4 as uuidv4} from 'uuid'

import { storage, db } from "../../../services/firebaseConnection"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  // deleteObject
} from 'firebase/storage'

import { addDoc, collection } from "firebase/firestore"

const schema = z.object({
   adress: z.string().nonempty('O campo endereço é obrigatório'),
   name: z.string().nonempty('O campo nome é obrigatório'),
   price: z.string().nonempty('O preço é obrigatório'),
   area: z.string().nonempty('A área é obrigatória'),
   bedrooms: z.string().nonempty('O campo dormitórios é obrigatório'),
   bathrooms: z.string().nonempty('O campo banheiros é obrigatório'),
   cookrooms: z.string().nonempty('O campo cozinha é obrigatório'),
   garages: z.string().nonempty('O campo garagens é obrigatório'),
   nameBroker: z.string().nonempty('O nome do corretor é obrigatório'),
   imageBroker: z.string().nonempty('A imagem do corretor é obrigatória'),
   description: z.string().nonempty('A descrição é obrigatória'),
})

type FormData = z.infer<typeof schema>

interface ImageProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export const NewProperty = () => {
  const {user} = useContext(AuthContext)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const [propertyImages, setPropertyImages] = useState<ImageProps[]>([])

  async function handleUpload(image: File){
    if(!user?.uid){
      return;
    }

    const currentUid = user?.uid
    const uidImage = uuidv4()

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downLoadUrl) => {
        console.log('URL DE ACESSO DA FOTO',downLoadUrl)
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downLoadUrl,
        }

        setPropertyImages((images) => [...images, imageItem])
      })
    })
  }

  function onSubmit(data: FormData){

    // if(propertyImages.length === 0){
    //   alert('Carregue alguma imagem!')
    //   return
    // }

    const propertyListImages = propertyImages.map( property => {
      return{
        uid:property.uid,
        name: property.name,
        url: property.url,
      }
    })

    addDoc(collection(db, 'property'), {
      name: data.name.toUpperCase(),
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
      create: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: propertyListImages,

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

  async function handleDeleteImage(item: ImageProps){
     const imagePath = `images/${item.uid}/${item.name}`

     const imageRef = ref(storage, imagePath)

     try {
      await deleteObject(imageRef)
      setPropertyImages(propertyImages.filter((proprerty) => proprerty.url !== item.url))
     } catch (err) {
       console.log('ERRO AO DELETAR IMAGEM')
     }
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0]

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        await handleUpload(image)
      }else{
        alert('Faça upload de uma imagem jpeg ou png!')
      }
    }
  }
    return (
      <Container>
        <PanelHeader/>

        <div className="w-full shadow-sm bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
          <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-700 h-32 md:w-48">
            <div className="absolute cursor-pointer">
              <FiUpload size={30}/>
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

          {propertyImages.map(item => (
            <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
              <button
                 className="absolute"
                 onClick={() => handleDeleteImage(item)}
                 >
                <FiTrash size={30} color='white'/>
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
          <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full">

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
                <div className="mb-3">
                  <p className="mb-2 font-bold">Endereço</p>
                  <Input
                  type="text"
                  register={register}
                  name="adress"
                  error={errors.adress?.message}
                  placeholder="Endereço do imóvel..."
                  />
                </div>
            </div>

            <div className="grid md:grid-cols-2 items-center gap-4">
              <div className="w-full">
              <p className="mb-2 font-bold">Preço</p>
              <Input
               type="text"
               register={register}
               name="price"
               error={errors.price?.message}
               placeholder="Preço do imóvel..."
              />
               </div>
              <div className="w-full">
              <p className="mb-2 font-bold">Área Total</p>
              <Input
               type="text"
               register={register}
               name="area"
               error={errors.area?.message}
               placeholder="Tamanho total da área..."
              />
               </div>
            </div>

            <div className="grid md:grid-cols-2 items-center gap-4">
              <div className="w-full">
              <p className="mb-2 font-bold">Dormitórios</p>
              <Input
               type="text"
               register={register}
               name="bedrooms"
               error={errors.bedrooms?.message}
               placeholder="Quantidade de dormitórios..."
              />
               </div>
              <div className="w-full">
              <p className="mb-2 font-bold">Banheiros</p>
              <Input
               type="text"
               register={register}
               name="bathrooms"
               error={errors.bathrooms?.message}
               placeholder="Quantidade de banheiros..."
              />
               </div>
            </div>

           <div className="grid gri md:grid-cols-2 items-center gap-4">
           <div className="w-full">
              <p className="mb-2 font-bold">Cozinhas</p>
              <Input
               type="text"
               register={register}
               name="cookrooms"
               error={errors.cookrooms?.message}
               placeholder="Quantidade de cozinhas..."
              />
               </div>
            <div className="w-full">
              <p className="mb-2 font-bold">Garagens</p>
              <Input
               type="text"
               register={register}
               name="garages"
               error={errors.garages?.message}
               placeholder="Quantidade de garagens..."
              />
               </div>
           </div>

            <div className="grid gri md:grid-cols-2 items-center gap-4">
              <div className="w-full">
                  <p className="mb-2 font-bold">Nome do corretor</p>
                  <Input
                   type="text"
                   register={register}
                   name="nameBroker"
                   error={errors.nameBroker?.message}
                   placeholder="Nome do corretor..."
                  />
               </div>
              <div className="w-full">
                  <p className="mb-2 font-bold">Imagem do corretor</p>
                  <Input
                   type="text"
                   register={register}
                   name="imageBroker"
                   error={errors.imageBroker?.message}
                   placeholder="imagem perfil do corretor..."
                  />
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
                   {errors.description && <p className="mb-1 text-red-400">{errors.description.message}</p>}
               </div>
            </div>
            <button type="submit" className="w-full rounded-md h-12 relative top-[0.1rem] hover:bg-indigo-500
               transition duration-700 mt-7 cursor-pointer bg-indigo-700 text-white
               font-medium">Cadastrar</button>
          </form>
        </div>
        <br />
      </Container>
    )
  }


