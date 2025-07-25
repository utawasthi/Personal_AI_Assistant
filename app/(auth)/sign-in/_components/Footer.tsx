import Image from "next/image"

const list1 : string[] = [
  'Product', 'Research' , 'Careers' , 'Company' , 'News',
];

const list2 : string[] = [
  'Terms of service' , 'Privacy Policy' , 'Your Privacy Choices' , 'Responsible disclosure policy' , 'Compliance',
]

function Footer() {
  return (
    <div className = 'absolute bottom-0 left-0 right-0 grid grid-cols-12 dark:bg-black/85 p-3 min-h-[30vh]'>
      <div 
        className = 'col-span-4 md:col-span-6 flex flex-col  justify-start gap-5 p-3'
      >
        <div>
          <Image 
            src = {'/orbit.png'}
            alt = 'logo'
            height = {40}
            width = {40}
            className = 'w-[40px] h-[40px] object-cover'
          />
        </div>
        <div
          className = 'dark:text-white/70 font-sans tracking-wide'
        >
          Follow us on our Socials
        </div>
        <div 
          className = 'flex justify-start items-center gap-4 cursor-pointer'
        >
          <img 
            src = '/meta.png'
            className = 'h-[20px] w-[20px]'
            />
            <img 
            src = '/google.png'
            className = 'h-[20px] w-[20px]'
            />
            <img 
            src = '/instagram.png'
            className = 'h-[20px] w-[20px] bg-transparent'
            />
            <img 
            src = '/twitter-x.png'
            className = 'h-[20px] w-[20px]'
            />
        </div>
      </div>
      <div className = 'col-span-4 md:col-span-3'>
        {
          list1.map((item , ind) => (
            <div 
             key = {ind}
             className = 'dark:text-gray-300 dark:hover:text-cyan-700 cursor-pointer m-2 text-sm'
            >
              {item}
            </div>
          ))
        }
      </div>
      <div className = 'col-span-4 md:col-span-3'>
        {
          list2.map((item , ind) => (
            <div 
             key = {ind}
             className = 'dark:text-gray-300 dark:hover:text-cyan-700 cursor-pointer m-2 text-sm'
            >
              {item}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Footer