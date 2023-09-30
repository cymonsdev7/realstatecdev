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

export const SliderHomeMobile = () => {
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
       className='-mt-3.5 mySwiperMobile -z-10'
       autoplay={{
         delay: 4000,
         disableOnInteraction: false,
       }}
       slidesPerView={sliderPerView}
       pagination={{clickable: true}}
       modules={[Autoplay, Pagination, Navigation]}

       >
          <SwiperSlide className='w-full h-[89vh]'>
               <img src='https://firebasestorage.googleapis.com/v0/b/remaxauth1.appspot.com/o/images%2F2aJzhEk1Y9VrvpQysHxPLcXJDCk2%2F8e2c8fe6-2805-4239-b61b-4bbf5dd59113?alt=media&token=603aec47-a238-4da6-8e02-95dd73675cc5' alt="" />
          </SwiperSlide>
          <SwiperSlide className='w-full h-[89vh]'>
               <img src='https://firebasestorage.googleapis.com/v0/b/remaxauth1.appspot.com/o/images%2F2aJzhEk1Y9VrvpQysHxPLcXJDCk2%2F8e2c8fe6-2805-4239-b61b-4bbf5dd59113?alt=media&token=603aec47-a238-4da6-8e02-95dd73675cc5' alt="" />
          </SwiperSlide>
          <SwiperSlide className='w-full h-[89vh]'>
               <img src='https://firebasestorage.googleapis.com/v0/b/remaxauth1.appspot.com/o/images%2F2aJzhEk1Y9VrvpQysHxPLcXJDCk2%2F8e2c8fe6-2805-4239-b61b-4bbf5dd59113?alt=media&token=603aec47-a238-4da6-8e02-95dd73675cc5' alt="" />
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
