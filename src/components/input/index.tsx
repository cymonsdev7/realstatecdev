import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: string
  placeholder: string
  name: string
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
  className?: string
}

export const Input = ({
  type,
  placeholder,
  name,
  register,
  rules,
  error,
  className
}: InputProps) => {
  return (
    <>
      <input
        className="w-full bg-white font-medium focus:bg-indigo-700 focus:border-4
         focus:border-indigo-100 focus:text-gray-500 text-gray-700 outline-none border-2
          rounded-md h-12 px-2"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-300">{error}</p>}
    </>
  )
}
