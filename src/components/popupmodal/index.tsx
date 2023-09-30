
import { Container } from '../container'
import { IoMdClose } from 'react-icons/io';


interface ModalVisibleProps{
  isvisible: any;
}

export const PopupModalBroker = ({isvisible}: ModalVisibleProps) => {

  if(!isvisible) return null

  return (
    <Container>
       {/* MODAL BUTTON */}
    <div
        className="fixed inset-0 bg-indigo-900 bg-opacity-25
         backdrop-blur-sm flex justify-center items-center"
      >
        <div className="w-[700px]">
          <button
              className='text-white flex items-center justify-end w-full'

              >
                 <IoMdClose size={28}/>
          </button>
          <div className="bg-white p-2 rounded-lg">
            <h1 className="text-3xl text-white">Modal</h1>
          </div>
        </div>
      </div>
    </Container>
  )
}
