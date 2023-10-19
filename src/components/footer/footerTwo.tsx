import { GrInstagram } from 'react-icons/gr'
import { ImWhatsapp } from 'react-icons/im'
import { PiFacebookLogoBold } from 'react-icons/pi'
import Logo from '../../svgs/Logo'
import { addDoc, collection } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { db } from '../../services/firebaseConnection'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../input'

const schema = z.object({
  emailContactPage: z.string().nonempty('O campo email é obrigatório'),
})

type FormData = z.infer<typeof schema>

export const FooterTwo = () => {
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
    addDoc(collection(db, 'descontos'), {
      emailContactPage: data.emailContactPage,
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
    <div>
      <footer className="bg-white">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-400 xl:text-2xl">
                Inscreva-se para receber grandes imóveis
              </h1>

              <form
               onSubmit={handleSubmit(onSubmitContactPage)}
               className="">
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

                <button
                  type='submit'
                  className="w-full h-12 mt-3 rounded-lg bg-indigo-700 text-white
                  font-bold hover:bg-indigo-500"
                >
                  Receber Imóveis
                </button>
              </form>
            </div>

            <div>
              <p className="font-semibold text-xl text-gray-500">Recursos</p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <a
                  href="#"
                  className="text-gray-400 transition-colors duration-300 hover:text-indigo-700"
                >
                  Página Inicial
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors duration-300 hover:text-indigo-700"
                >
                  Quem somos nós
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors duration-300 hover:text-indigo-700"
                >
                  Nossa Filosofia
                </a>
              </div>
            </div>

            <div>
              <p className="font-semibold text-xl text-gray-500">
                Política & Privacidade
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <a
                  href="#"
                  className="text-gray-400 transition-colors duration-300 hover:text-indigo-700"
                >
                  Política e Privacidade
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors duration-300 hover:text-indigo-700"
                >
                  Seja um corretor Remax
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors duration-300 hover:text-indigo-700"
                >
                  Contato Remax
                </a>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-300" />

          <div className="flex items-center justify-between">
            <a href="#" className="mt-7 w-44">
              <Logo />
            </a>

            <div className="flex items-center -mx-2">
              <a
                href="#"
                className="mx-2 text-indigo-600 transition-colors duration-700 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                <ImWhatsapp size={19} />
              </a>

              <a
                href="#"
                className="mx-2 text-indigo-600 transition-colors duration-700 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Facebook"
              >
                <GrInstagram size={18} />
              </a>

              <a
                href="#"
                className="mx-2 text-indigo-600 transition-colors duration-700 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Github"
              >
                <PiFacebookLogoBold size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
