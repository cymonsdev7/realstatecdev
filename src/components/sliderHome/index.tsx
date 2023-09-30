// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import {Autoplay, Pagination, Navigation} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'


import {
    collection,
    query,
    getDocs,
    orderBy
} from 'firebase/firestore'

import { db } from '../../services/firebaseConnection'
import { useEffect, useRef, useState } from 'react'

interface SliderProps{
  id: string;
  title: string;
  subTitle: string;
  uid: string;
  images: SliderImageProps[];
}

interface SliderImageProps{
  title: string;
  uid: string;
  url: string;
}

export const SliderHome = () => {
  const [slider, setSlider] = useState<SliderProps[]>([])
  const [sliderPerView, setSliderPerView] = useState(1)

  useEffect(() => {
    function loadSliders(){
      const sliderRef = collection(db, 'sliders')
      const queryRef = query(sliderRef, orderBy('created', 'desc'))

      getDocs(queryRef)
      .then((snapshot) => {
        let listSlider = [] as SliderProps[]

        snapshot.forEach( doc => {
          listSlider.push({
            id: doc.id,
            title: doc.data().title,
            subTitle: doc.data().subTitle,
            images: doc.data().images,
            uid: doc.data().uid
          })
        })

        setSlider(listSlider)
      })

    }
    loadSliders()
  },[])



  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  function handleSliderLoad(id: string){

  }

  return (
    <>
       <Swiper
       className='-mt-3.5 mySwiper -z-10 mySwiper2'
       autoplay={{
         delay: 8000,
         disableOnInteraction: false,
       }}
       slidesPerView={sliderPerView}
       pagination={{clickable: true}}
       modules={[Autoplay, Pagination, Navigation]}

       >
          <SwiperSlide>
               <img src='https://firebasestorage.googleapis.com/v0/b/remaxauth1.appspot.com/o/images%2F2aJzhEk1Y9VrvpQysHxPLcXJDCk2%2F80044212-0b1a-4d9b-9ead-2b1915eac48f?alt=media&token=c88f5c95-1341-4fed-94e9-63f0c6d15436' alt="" />
          </SwiperSlide>
          <SwiperSlide>
               <img src='https://firebasestorage.googleapis.com/v0/b/remaxauth1.appspot.com/o/images%2F2aJzhEk1Y9VrvpQysHxPLcXJDCk2%2F117eed71-e139-4734-8705-699a75607cae?alt=media&token=b904a3f0-5b40-4881-a5c8-8a9f502276c1' alt="" />
          </SwiperSlide>
          <SwiperSlide>
               <img src='https://firebasestorage.googleapis.com/v0/b/remaxauth1.appspot.com/o/images%2F2aJzhEk1Y9VrvpQysHxPLcXJDCk2%2Fe9af2bd3-420a-4d7e-8a66-730bbde4f2d0?alt=media&token=d59ed011-b414-4a72-853d-40f6a2e422b0' alt="" />
          </SwiperSlide>

          <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
       </Swiper>
    </>
  )
}
