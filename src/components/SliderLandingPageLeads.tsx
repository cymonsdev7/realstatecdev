import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export const SliderLandingPageLeads = () => {
  const [sliderPerview, setSliderPerview] = useState<number>(2)

  useEffect(() => {
     function handleResize(){
        if(window.innerWidth < 720){
          setSliderPerview(1)
        }else{
          setSliderPerview(1)
        }
     }

     handleResize()

     window.addEventListener('resize', handleResize)

     return() =>{
       window.removeEventListener('resize', handleResize)
     }
  },[])

  return (
    <>
      <Swiper
        className='mt-4 mb-4'
        slidesPerView={sliderPerview}
        pagination={{clickable: true}}
        navigation
      >
        <SwiperSlide className=''>
          <img
            className=' object-cover rounded-xl border-8 border-indigo-500'
            src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2F7b2284e1-4c36-493a-b853-4adc218ca419-1.jpg?alt=media&token=cc680ede-e43c-419f-9441-b8ddf3fb4642" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className=' object-cover rounded-xl border-8 border-indigo-500'
           src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2Fed6bfbd7-d6ec-4581-a83d-ca5bb1fceffe?alt=media&token=6022d4a6-9aed-4498-a3d0-2cd9457aa23c" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className=' object-cover rounded-xl border-8 border-indigo-500'
           src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2Fe11f3e1b-2457-4f9a-baa1-43880e178f70?alt=media&token=4cd4ca07-d5d1-448b-bce9-98aa6b7c085b" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className=' object-cover rounded-xl border-8 border-indigo-500'
           src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2Facfb7bdb-faa5-4ced-867a-6ef6f258c650?alt=media&token=5adcb7cb-921c-4a3f-b399-1ce7b2332c46" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className=' object-cover rounded-xl border-8 border-indigo-500'
           src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2Fa574d749-2af8-4b48-bcc2-39b06ec0c6a5?alt=media&token=a186a564-35eb-48f0-934d-7cf335aa6352" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className=' object-cover rounded-xl border-8 border-indigo-500'
           src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2F8ff903f6-0455-4e5e-9de5-d711fba9e3ed?alt=media&token=fd103506-43b2-46cb-81da-55289655fb7d" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className=' object-cover rounded-xl border-8 border-indigo-500'
           src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2F344c34a2-3b87-4335-ac79-4b57e796b30d?alt=media&token=4a0100f4-f2dc-445d-8d2f-08f90e15fbb1" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className=' object-cover rounded-xl border-8 border-indigo-500'
           src="https://firebasestorage.googleapis.com/v0/b/oneremax-3412d.appspot.com/o/images%2FfuzCEeacNXPOaU9CZ1lkx8JVlJg2%2F1dfd6dac-975e-4750-9503-9e455ed82e71?alt=media&token=7c595550-96ed-4e21-9c51-8ad6e03fd99f" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
