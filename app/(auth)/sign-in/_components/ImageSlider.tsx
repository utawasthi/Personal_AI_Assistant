import { images } from "@/services/ImageSlider";
import Image from "next/image";
import { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";


interface ImageType {
  author : string;
  id : string;
  download_url : string;
}

function ImageSlider () {

  const [activeSlide , setActiveSlide] = useState<number>(0);

  const handeClickBackward = () => {
    setActiveSlide((activeSlide - 1 + 10) % 10);
  }

  const handeClickForward = () => {
    setActiveSlide((activeSlide + 1) % 10);
  }

  return (
    <div className = 'w-[100vw] h-screen lg:w-full flex flex-col items-center justify-center'>
      <div className = 'flex items-center justify-center gap-10'>
        <div 
          className = 'text-3xl text-cyan-400'
          onClick = {handeClickBackward}
        >
          <IoIosArrowBack />
        </div>
        {
          images.map((item , ind) => (
            <div 
              className = ''
              key = {item.id}
            >
              {
                activeSlide === ind ? 
                <Image
                  src = {item.url}
                  alt = {item.url}
                  height = {400}
                  width = {400}
                  />
                : null
              }
            </div>
          ))
        }
        <div 
          className = 'text-3xl text-cyan-400'
          onClick = {handeClickForward}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div className = 'flex items-center justify-center mt-15 gap-3'>
        {
          [...Array(10)].map((_ , ind) => (
            <RiCheckboxBlankCircleFill 
              className = {activeSlide == ind ? 'circle active' : 'circle'}
              onClick = {() => setActiveSlide(ind)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ImageSlider