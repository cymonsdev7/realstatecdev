import { Link } from "react-router-dom"

export const MenuDesktop = () => {
  return (
    <>
       <div className="flex items-center gap-10 text-gray-700 font-bold 
       text-[0.9rem] uppercase menu_desktop">
           <Link to='/' className="hover:text-indigo-700 transition-all ease-in-out duration-1000
           hover:border-b-4 hover:border-r-5  hover:border-b-indigo-700
           ">Home</Link>
           <Link to='/sobre' className="hover:text-indigo-700 transition-all ease-in-out duration-1000
           hover:border-b-4 hover:border-r-5  hover:border-b-indigo-700
           ">Sobre Nós</Link>
           <Link to='/contato' className="hover:text-indigo-700 transition-all ease-in-out duration-1000
           hover:border-b-4 hover:border-r-5  hover:border-b-indigo-700
           ">Contato</Link>
           <div>
             <button className="bg-indigo-700 px-7 py-1 text-white rounded-md
             transition-all duration-700 ease-in-out uppercase hover:bg-indigo-500">Imóveis</button>
           </div>
       </div>
    </>
  )
}
