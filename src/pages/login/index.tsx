import { useEffect } from "react"
import Logo from "../../svgs/Logo"
import { Container } from "../../components/container"
import { Link, useNavigate } from "react-router-dom"

import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { signInWithEmailAndPassword, signOut } from "@firebase/auth"
import { auth } from "../../services/firebaseConnection"

import toast from 'react-hot-toast'
import { HeaderPrincipal } from "../../components/headerprincipal"

const schema = z.object({
  email: z.string().email('Insira um email válido').nonempty('O Campo email é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório')
})

type FormData = z.infer<typeof schema>

export const Login = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'

  })

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }
    handleLogout()
  },[])

  function onSubmit(data: FormData){
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((_user) => {
      toast.success('Logado com sucesso!')
      navigate('/dashboard', {replace: true})
    })
    .catch(_err => {
      toast.error('Erro ao fazer o login!')
    })
  }

  return (
    <>

    <Container>
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <div className="w-52">
      <Link to='/'>
        <Logo/>
      </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 max-w-xl w-full rounded-lg">
       <div className="mb-3">
       <Input
        type='email'
        placeholder='Digite Seu Email...'
        name='email'
        error={errors.email?.message}
        register={register}
        />
       </div>
       <div className="mb-3">
       <Input
        type='password'
        placeholder='Digite Sua Senha...'
        name='password'
        error={errors.password?.message}
        register={register}
        />
       </div>

        <button type="submit" className="w-full hover:bg-indigo-500 transition duration-700 bg-indigo-700 h-11 px-2 rounded-md text-white font-bold">Acessar</button>
      </form>
      <Link to='/'>
      <p className="font-medim text-gray-500">Clique aqui para retornar para o WebSite <span className="text-indigo-700 font-bold hover:text-gray-700 transition duration-700 cursor-pointer underline">Voltar</span> </p>
      </Link>
    </div>
    </Container>
    </>
  )
}


