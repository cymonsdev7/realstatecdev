import { BsFillTelephonePlusFill } from "react-icons/bs";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

export const TopHeaderTwo = () => {
  return (
    <>
      <section
        className="flex justify-between items-center mx-auto
         text-gray-300 font-semibold text-sm bg-indigo-700 w-full
         top-header-two
         "
      >
        {/* DIV ENDEREÇO */}
        <div
          className="border border-solid border-gray-200 w-[25%]
          border-r-0 border-l-0 border-t-0 flex items-center justify-center h-14"
        >
          <div className="flex items-center gap-1">
            <MdLocationOn color='#f5f5f5' size={20} />
            Av.Teodolino P. A. 1273 - Sala 07
          </div>
        </div>

        {/* DIV TELEFONE */}
        <div
          className="border border-solid border-gray-200 w-[25%]
           border-r-0 border-t-0 flex items-center justify-center h-14"
        >
          <div className="flex items-center gap-2">
            <BsFillTelephonePlusFill color='#f5f5f5' size={17} />
            (34)3421-9779
          </div>
        </div>

        {/* DIV EMAIL */}
        <div
          className="border border-solid border-gray-200 w-[25%]
          border-r-0 border-t-0 flex items-center justify-center h-14"
        >
          <div className="flex items-center gap-2">
            <MdEmail color='#f5f5f5' size={20} />
            info@consultimobiliaria.com
          </div>
        </div>

        {/* ICON SOCIAIS */}
        <div
          className="border border-solid border-gray-200 w-[25%]
          flex items-center justify-center h-14 gap-2 border-r-0
           border-t-0
          "
        >
          {/* <div className="font-semibold">
            Siga-nos:
          </div> */}
          <div className="flex items-center gap-7">
            <div className="text-white hover:scale-125
            duration-200 transition-all ease-in-out delay-200
            hover:text-indigo-700 cursor-pointer
            ">
              <RiWhatsappFill size={22} />
            </div>
            <div className="text-white hover:scale-125
            duration-200 transition-all ease-in-out delay-200
            hover:text-indigo-700 cursor-pointer
            ">
              <RiInstagramFill size={22} />
            </div>
            <div className="text-white hover:scale-125
            duration-200 transition-all ease-in-out delay-200
            hover:text-indigo-700 cursor-pointer
            ">
              <FaFacebook size={20} />
            </div>
            <div className="text-white hover:scale-125
            duration-200 transition-all ease-in-out delay-200
            hover:text-indigo-700 cursor-pointer
            ">
              <FaYoutube size={23} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
