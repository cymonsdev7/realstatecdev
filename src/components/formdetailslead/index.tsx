import { addDoc, collection } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { register } from 'swiper/element'
import { db } from '../../services/firebaseConnection'
import { Input } from '../input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  emailContactPage: z.string().nonempty('O campo email é obrigatório'),
  emailContactWhatsapp: z.string().nonempty('O campo Whatsapp é obrigatório')
})

type FormData = z.infer<typeof schema>

export const FormDetailsLeads = () => {
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
    addDoc(collection(db, 'FormDetails'), {
      emailContactPage: data.emailContactPage
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
      <div className="sm:col-span-2">
        <div className="px-4 sm:px-0 mt-7">
          <h3 className="text-3xl font-bold leading-7 text-indigo-800">
            Preencha o Formulário:
          </h3>
          <p className="mt-1 max-w-2xl text-md leading-7 tracking-wider text-gray-700">
            Para Que o Corretor Entre em Contato
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitContactPage)} className=" px-4">
          <div className="grid md:grid-cols-2 items-center gap-4">
            <div className="mb-3">
              <p className="mb-2 mt-2 font-bold">Email</p>
              <Input
                type="email"
                register={register}
                name="emailContactPage"
                error={errors.emailContactPage?.message}
                placeholder="Digite Seu Melhor Email..."
              />
            </div>
            <div className="mb-3">
              <p className="mb-2 mt-2 font-bold">Email</p>
              <Input
                type="text"
                register={register}
                name="emailContactWhatsapp"
                error={errors.emailContactWhatsapp?.message}
                placeholder="Digite Seu Whatsapp..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-3 rounded-lg bg-indigo-700 text-white
                  font-bold hover:bg-indigo-500"
          >
            Entrar em Contato
          </button>
        </form>
      </div>
    </>
  )
}
