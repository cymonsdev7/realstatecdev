import { Container } from '../container'

import { useForm } from 'react-hook-form'
import { Input } from '../input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import { toast } from 'react-hot-toast'
import { DropdownMenuCategory } from '../DropdownMenuCategory'
import { useNavigate } from 'react-router-dom'


const schema = z.object({
  nameContactPage: z.string().nonempty('O campo primeiro nome é obrigatório'),
  emailContactPage: z.string().nonempty('O campo email é obrigatório'),
  whatsappContactPage: z
    .string()
    .min(11, 'O campo whatsapp é obrigatório')
    .nonempty()
})

type FormData = z.infer<typeof schema>

export const FormDetailsMailChimpLeads = () => {
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


      <h1 className="text-center text-4xl mb-14 font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Preencha o </span>
        Formulário
      </h1>
      <p

       className='font-semibold text-gray-400 text-center -mt-14 mb-4 text-sm
       '>Para que os corretores entrem em contato com você!</p>
      <div
        className="w-full bg-white mb-8 rounded-lg
       flex flex-col items-center gap-2 mt-2"
      >
        <form className="w-full" onSubmit={handleSubmit(onSubmitContactPage)}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center gap-4">

            <div className="mb-3">
              <p className="mb-2 font-bold">Primeiro Nome</p>
              <Input
                type="text"
                register={register}
                name="nameContactPage"
                error={errors.nameContactPage?.message}
                placeholder="Digite Seu Primeiro Nome..."
              />
            </div>

            <div className="mb-3">
              <p className="mb-2 font-bold">Email</p>
              <Input
                type="email"
                register={register}
                name="emailContactPage"
                error={errors.emailContactPage?.message}
                placeholder="Digite Seu Melhor Email..."
              />
            </div>
            <div className="mb-3">
              <p className="mb-2 font-bold">DDD+Whatsapp</p>
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

            type='submit'
            className="w-full h-12 rounded-lg bg-indigo-700 text-white
             font-bold hover:bg-indigo-500"
          >
            Enviar Dados
          </button>
        </form>
      </div>
    </>
  )
}
