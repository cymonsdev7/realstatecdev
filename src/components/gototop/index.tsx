import { useEffect, useState } from "react";
import { Wrapper } from "../../styles/goToTop";
import {MdOutlineKeyboardDoubleArrowDown} from "react-icons/md";

export const GoToTop = () => {
  const [topIsVisible, setTopIsVisible] = useState(false)
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop

    if(winScroll > heightToHidden){
    setTopIsVisible(true)
    }else{
      setTopIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  },[])

  return (
    <Wrapper>
        {topIsVisible && (

      <div className="top-btn border-4 border-white" onClick={goToBtn}>
        <MdOutlineKeyboardDoubleArrowDown className='hover:rotate-180 transition-all ease-in-out duration-700' size={27}/>
      </div>
        )}
    </Wrapper>
  );
};
