import { useState } from 'react'
import { Container } from '../container'

export const ContatoTwo = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cidade, setCidade] = useState('')
  const [message, setMessage] = useState('')

  function sendEmail(e){
    e.preventDefault()

    if(name === '' || email === '' || whatsapp === '' || cidade === '' || message === ''){
      alert('Preencha Todos os Campos!')
      return
    }
    alert('TESTE')
  }
  return (
    <>
      <Container>
        <div
          className="w-full bg-white shadow-md p-3 rounded-lg flex
           flex-col sm:flex-row items-center gap-2 mt-2"
        >
          <form className="w-full" onSubmit={sendEmail}>
            <div className="grid md:grid-cols-2 items-center gap-4">
              <div className="mb-3">
                <p className="mb-2 font-bold text-gray-500">Seu Nome</p>
                <input
                  className="w-full bg-white font-medium focus:bg-indigo-700 focus:border-4
               focus:border-indigo-100 focus:text-white text-gray-700 outline-none border-2
                rounded-md h-12 px-2"
                  type="text"
                  placeholder="Digite Seu Primeito Nome..."
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <p className="mb-2 font-bold text-gray-500">Seu Email</p>
                <input
                  className="w-full bg-white font-medium focus:bg-indigo-700 focus:border-4
               focus:border-indigo-100 focus:text-white text-gray-700 outline-none border-2
                rounded-md h-12 px-2"
                  type="email"
                  placeholder="Digite Seu Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 items-center gap-4">
              <div className="mb-3">
                <p className="mb-2 font-bold text-gray-500">Seu Whatsapp</p>
                <input
                  className="w-full bg-white font-medium focus:bg-indigo-700 focus:border-4
               focus:border-indigo-100 focus:text-white text-gray-700 outline-none border-2
                rounded-md h-12 px-2"
                  type="text"
                  placeholder="Digite Seu Whatsapp Com DDD..."
                  onChange={(e) => setWhatsapp(e.target.value)}
                  value={whatsapp}
                />
              </div>
              <div className="mb-3">
                <p className="mb-2 font-bold text-gray-500">Sua Cidade</p>
                <input
                  className="w-full bg-white font-medium focus:bg-indigo-700 focus:border-4
               focus:border-indigo-100 focus:text-white text-gray-700 outline-none border-2
                rounded-md h-12 px-2"
                  type="text"
                  placeholder="Digite Sua Cidade..."
                  onChange={(e) => setCidade(e.target.value)}
                  value={cidade}
                />
              </div>
            </div>

            <div className="w-full mt-1">
            <p className="mb-2 font-bold text-gray-500">Descrição</p>
            <textarea
              className="mb-2 w-full rounded-md h-24 px-2 border-2 border-gray-200
                 focus:bg-indigo-700 focus:text-white"
                 placeholder="Digite o assunto da mensagem..."
                 onChange={(e) => setMessage(e.target.value)}
                 value={message}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md h-12 relative top-[0.1rem] hover:bg-indigo-500
               transition duration-700 mt-7 cursor-pointer bg-indigo-700 text-white
               font-medium"
          >
            Entrar em Contato
          </button>
          </form>
        </div>
      </Container>
    </>
  )
}
