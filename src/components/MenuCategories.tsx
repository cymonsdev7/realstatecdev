import { NavLink } from "react-router-dom"
import { DropdownMenuCategory } from "./DropdownMenuCategory"

export const MenuCategories = () => {
  return (
    <>
      <div className="w-full items-center flex h-10 text-gray-500 rounded-lg font-medium px-4"></div>
      <h1 className="text-center text-xl font-bold text-indigo-700 mt-14">
        <span className="text-gray-500">Escolha a Categoria</span> RE
        <span className="font-bold text-red-600 relative -top-1">/</span>
        MAX
      </h1>
      <div className="flex items-center justify-center w-full">
         <DropdownMenuCategory/>
      </div>
    </>
  )
}
