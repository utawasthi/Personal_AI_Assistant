import { images } from "@/services/ImageSlider";
import Image from "next/image";
import {useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

function ImageSlider () {

  const [activeSlide , setActiveSlide] = useState<number>(0);
  const [sliderMessage , setSliderMessage] = useState<string>(images[0].content);

  const handeClickBackward = () => {
    setActiveSlide((activeSlide - 1 + 5) % 5);
    setSliderMessage(images[(activeSlide - 1 + 5) % 5].content);
  }

  const handeClickForward = () => {
    setActiveSlide((activeSlide + 1) % 5);
    setSliderMessage(images[(activeSlide + 1) % 5].content);
  }

  return (
    <div className = 'w-[100vw] h-screen lg:w-full flex flex-col items-center justify-center'>
      <h1
       className = 'text-2xl font-light dark:text-cyan-500 font-serif tracking-wide'
      >
        {sliderMessage}
      </h1>
      <div className = 'flex items-center justify-center gap-5'>
        <div 
          className = 'text-5xl text-cyan-400 cursor-pointer'
          onClick = {handeClickBackward}
        >
          <IoIosArrowBack />
        </div>
        <div>
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
                    height = {450}
                    width = {500}
                    className = 'h-[450px] w-[550px] object-contain'
                    />
                  : null
                }
              </div>
            ))
          }
        </div>
        <div 
          className = 'text-5xl text-cyan-400 cursor-pointer'
          onClick = {handeClickForward}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div className = 'flex items-center justify-center mt-15 gap-3'>
        {
          [...Array(5)].map((_ , ind) => (
            <RiCheckboxBlankCircleFill 
              key = {ind}
              className = {activeSlide == ind ? 'fill-cyan-400 cursor-pointer' : 'fill-white cursor-pointer'}
              onClick = {() => setActiveSlide(ind)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ImageSlider