import { Container } from '../container'

import { useForm } from 'react-hook-form'
import { Input } from '../input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import { toast } from 'react-hot-toast'
import { DropdownMenuCategory } from '../DropdownMenuCategory'

const schema = z.object({
  nameContactPage: z.string().nonempty('O campo primeiro nome é obrigatório'),
  lastNameContactPage: z.string().nonempty('O Campo útimo Nome é obrigatório'),
  emailContactPage: z.string().nonempty('O campo email é obrigatório'),
  topicContactPage: z.string().nonempty('O Campo assunto é obrigatório'),
  cityContactPage: z.string().nonempty('O Campo cidade é obrigatório'),
  whatsappContactPage: z
    .string()
    .min(11, 'O campo whatsapp é obrigatório')
    .nonempty()
})

type FormData = z.infer<typeof schema>

export const ContactThree = () => {
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
      lastNameContactPage: data.lastNameContactPage,
      emailContactPage: data.emailContactPage,
      topicContactPage: data.topicContactPage,
      cityContactPage: data.cityContactPage,
      whatsappContactPage: data.whatsappContactPage
    })
      .then(() => {
        reset()
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
        <span className="text-gray-500">Contato</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>
      <div
        className="w-full bg-white shadow-md p-9 mb-8 rounded-lg
       flex flex-col sm:flex-row sm:w-full items-center gap-2 mt-2"
      >
        <form className="w-full" onSubmit={handleSubmit(onSubmitContactPage)}>
          <div className="grid md:grid-cols-2 items-center gap-4">
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
              <p className="mb-2 font-bold">Último Nome</p>
              <Input
                type="text"
                register={register}
                name="lastNameContactPage"
                error={errors.lastNameContactPage?.message}
                placeholder="Digite Seu Último Nome..."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 items-center gap-4">
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

          <div className="mb-3">
            <p className="mb-2 font-bold">Cidade</p>
            <Input
              type="text"
              register={register}
              name="cityContactPage"
              error={errors.cityContactPage?.message}
              placeholder="Digite Sua Cidade..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-bold">Assunto do Email</p>
            <textarea
              className="w-full h-44 outline-none focus:bg-indigo-700 focus:text-gray-100 border-2 rounded-lg p-2"
              {...register('topicContactPage')}
              name="topicContactPage"
              id="topicContactPage"
              placeholder="Digite o Assunto do Email..."
            />
            {errors.topicContactPage && (
              <p className="mb-1 text-red-300">
                {errors.topicContactPage.message}
              </p>
            )}
          </div>

          <button
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
