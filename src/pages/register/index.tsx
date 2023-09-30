import Logo from '../../svgs/Logo'
import { Container } from '../../components/container'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '../../components/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { auth } from '../../services/firebaseConnection'
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { toast } from 'react-hot-toast'

const schema = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  email: z
    .string()
    .email('Insira um email válido')
    .nonempty('O Campo email é obrigatório'),
  password: z
    .string()
    .min(7, 'A senha deve ter pelo menos 7 caracteres')
    .nonempty('O campo senha é obrigatório')
})

type FormData = z.infer<typeof schema>

export const Register = () => {
  const { handleInfoUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth)
    }
    handleLogout()
  }, [])

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name
        })

        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid
        })
        toast.success('🙂Bem Vindo à Remax Dashboard!')
        navigate('/dashboard', { replace: true })
      })

      .catch((error) => {
        toast.error('Erro ao Cadastrar😥')
      })
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <div className="w-44">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-10 max-w-xl w-full rounded-lg"
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite Seu Nome Completo..."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite Seu Email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite Sua Senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="w-full hover:bg-indigo-500 transition duration-700 bg-indigo-700 h-11 px-2 rounded-md text-white font-bold"
          >
            Cadastrar
          </button>
        </form>
        <Link to="/login">
          <p className="font-medim text-gray-500">
            Já possui uma conta? Faça{' '}
            <span className="text-indigo-700 font-bold hover:text-gray-700 transition duration-700 cursor-pointer">
              Login
            </span>{' '}
          </p>
        </Link>
      </div>
    </Container>
  )
}
