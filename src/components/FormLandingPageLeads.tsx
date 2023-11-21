import { Container } from '../components/container'

import { useForm } from 'react-hook-form'
import { Input } from '../components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../src/services/firebaseConnection'

import { toast } from 'react-hot-toast'
import { DropdownMenuCategory } from '../components/DropdownMenuCategory'
import { useNavigate } from 'react-router-dom'
import { BsHouseHeartFill } from 'react-icons/bs'
import Logo from '../svgs/Logo'
import { SliderLandingPageLeads } from './SliderLandingPageLeads'
import { ArrowDownAnimate } from '../svgs/ArrowDownAnimate'
import { IoIosArrowDown } from "react-icons/io";


const schema = z.object({
  nameContactPage: z.string().nonempty('O campo primeiro nome é obrigatório'),
  emailContactPage: z.string().nonempty('O campo email é obrigatório'),
  whatsappContactPage: z
    .string()
    .min(11, 'O campo whatsapp é obrigatório')
    .nonempty()
})

type FormData = z.infer<typeof schema>

export const FormLandingPageLeads = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  function onSubmitContactPage(data: FormData) {
    addDoc(collection(db, 'contact'), {
      nameContactPage: data.nameContactPage,
      emailContactPage: data.emailContactPage,
      whatsappContactPage: data.whatsappContactPage
    })
      .then(() => {
        reset()
        navigate('/obrigado')
        toast.success('CADASTRADO COM SUCESSO!')
        console.log('CADASTRADO COM SUCESSO!')
      })
      .catch((error) => {
        console.log(error)
        toast.error('ERRO AO CADASTRAR...')
        console.log('ERRO AS CADASTRAR NO BANCO!')
      })
  }

  return (
    <>
      <div className='w-full'>
        <div className="flex items-center gap-1">
          <div
            className=" sm:mb-5 relative sm:top-[1.3rem] lg:relative lg:-top-3
         text-indigo-700"
          >
            <BsHouseHeartFill size={37} />
          </div>
          <div>
            <h2
              className="text-4xl font-bold tracking-tight
             text-gray-900 sm:text-4xl lg:-mt-10"
            >
              Imóvel à Venda
            </h2>
          </div>
        </div>
        <h3 className='font-semibold px-10 lg:-mt-7'>Bairro: Industrial - Araguari-MG</h3>
        <div>
          <SliderLandingPageLeads/>
        </div>
        <div className="w-full p-14 bg-indigo-700 rounded-xl">
           <div className='w-full flex justify-center text-white text-4xl animate-bounce'>
            <IoIosArrowDown/>
          </div>
          <h1 className="text-center text-4xl font-bold text-indigo-300">
            <span className="text-gray-100">Preencha o </span>
            Formulário
          </h1>
          <p
            className="font-semibold text-gray-300 text-center mb-4 text-sm
       "
          >
            Para que o corretor entre em contato com você!
          </p>
          <div className='lg:ring-2 rounded-lg lg:py-4 lg:ring-indigo-400'>
          <form className="w-full lg:p-4" onSubmit={handleSubmit(onSubmitContactPage)}>
            <div className="grid lg:grid-cols-1 md:grid-cols-1 items-center gap-4">
              <div className="mb-3">
                <Input
                  type="text"
                  register={register}
                  name="nameContactPage"
                  error={errors.nameContactPage?.message}
                  placeholder="Digite Seu Primeiro Nome..."
                />
              </div>

              <div className="mb-3">
                <Input
                  type="email"
                  register={register}
                  name="emailContactPage"
                  error={errors.emailContactPage?.message}
                  placeholder="Digite Seu Melhor Email..."
                />
              </div>
              <div className="mb-3">
                <Input
                  type="text"
                  register={register}
                  name="whatsappContactPage"
                  error={errors.whatsappContactPage?.message}
                  placeholder="Ex: → 34993552222..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-white text-indigo-700
             font-bold text-lg mt-4"
            >
              Enviar Dados
            </button>
            <p className="text-sm font-medium text-gray-400 text-center mt-2">
              Seus dados estão seguros com a remax!
            </p>
          </form>
          </div>

        </div>
      </div>
    </>
  )
}
