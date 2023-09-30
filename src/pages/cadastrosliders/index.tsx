import { addDoc, collection } from "firebase/firestore";
import { FiTrash, FiUpload } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/input";
import { ChangeEvent, useContext, useState } from "react";

import {v4 as uuidV4} from 'uuid'

import { storage, db } from "../../services/firebaseConnection";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage'

import { AuthContext } from "../../contexts/AuthContext";

const schema = z.object({
  title: z.string().nonempty("O Campo é obrigatório"),
  subTitle: z.string().nonempty("O Campo é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface ImageSliderProps{
    uid: string;
    title: string;
    previewUrl: string;
    url: string;
}

export const CadastroSliders = () => {
    const {user} = useContext(AuthContext)
    const [imageSlider, setImageSlider] = useState<ImageSliderProps[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData){

    if(imageSlider.length === 0){
      alert('Envie Alguma Imagem...')
      return
    }
    const sliderListImages = imageSlider.map(slid => {
      return{
        uid: slid.uid,
        title: slid.title,
        url: slid.url,
      }
    })

    addDoc(collection(db, 'sliders'), {
      title: data.title,
      subTitle: data.subTitle,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: sliderListImages,
    })
    .then(() => {
      reset()
      setImageSlider([])
      console.log('CADASTRADO COM SUCESSO...')
    })
    .catch((error) => {
      console.log(error)
      console.log('ERRO AO CADASTRAR NO BANCO...')
    })
  }

  async function handleFileSliders(e: ChangeEvent<HTMLInputElement>){
     if(e.target.files && e.target.files[0]){
        const imageSliders = e.target.files[0]

        if(imageSliders.type === 'image/jpeg' || imageSliders.type === 'image/png'){
         await handleUploadSliders(imageSliders)
        }else{
            alert('Envie uma imagem jpeg ou png!')
        }
     }
  }

  async function handleUploadSliders(image: File){
    if(!user?.uid){
        return
    }

    const currentUidSliders = user?.uid
    const uidImageSliders = uuidV4()

    const uploadRefSliders = ref(storage, `images/${currentUidSliders}/${uidImageSliders}`)

    uploadBytes(uploadRefSliders, image)
    .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
            const imageItemSlider = {
                title: uidImageSliders,
                uid: currentUidSliders,
                previewUrl: URL.createObjectURL(image),
                url: downloadUrl,
            }

            setImageSlider((images) => [...images, imageItemSlider])
        })
    })
  }

  async function handleDeleteImageSlider(item: ImageSliderProps){
      const imageSliderPath = `images/${item.uid}/${item.title}`

      const imageSliderRef = ref(storage, imageSliderPath)

      try {
        await deleteObject(imageSliderRef)
        setImageSlider(imageSlider.filter((slider) => slider.url !== item.url))
      } catch (err) {
        console.log('ERRO AO DELETAR...')
      }
  }
  return (
    <>
      <div className="w-full bg-white mb-4 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button
          className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer
         border-gray-500 h-32 md:w-48"
        >
          <div className="absolute cursor-pointer">
            <FiUpload size={35} />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFileSliders}
            />
          </div>
        </button>

        {imageSlider.map( item => (
            <div key={item.title} className="w-full h-32 flex items-center justify-center relative">
                <button className="absolute" onClick={() => handleDeleteImageSlider(item)}>
                    <FiTrash size={28} color='#fff'/>
                </button>
                <img
                src={item.previewUrl}
                className="rounded-lg w-full h-32 object-cover"
                alt="foto da propriedade" />
            </div>
        ))}


      </div>

      <div className="w-full mb-4 bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full">
         <div className="flex w-full mb-3 flex-col items-center gap-4">

            <div className="mb-3 w-full">
                <p className="mb-2 font-medium">Titulo do Slider</p>
                <Input
                   type="text"
                   register={register}
                   name="title"
                   error={errors.title?.message}
                   placeholder="Digite o título do slider"
                />
            </div>
            <div className="mb-3 w-full">
                <p className="mb-2 font-medium">Subtítulo do Slider</p>
                <textarea
                className="w-full h-28 placeholder:p-2 border-2 border-gray-200 outline-none"
                   {...register('subTitle')}
                   name="subTitle"
                   id='subTitle'
                   placeholder="Digite o Subtítulo do slider"
                />
                {errors.subTitle && <p className="mb-1 text-red-400">{errors.subTitle.message}</p>}
            </div>
         </div>

         <button type="submit" className="w-full rounded-md bg-indigo-700
          text-white font-bold h-12 hover:bg-indigo-500 transition-all duration-700 ease-in-out">Cadastrar</button>

        </form>
      </div>
    </>
  );
};

