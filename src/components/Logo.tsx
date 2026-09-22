import Image from 'next/image'
import logo from '@/app/pawsome-advice-logo.png'
export default function Logo() {
  return (
    <Image className='bg-white .items-center .rounded '
      src= {logo}
      width={200}
      height={200}
      alt="Logo Pawsome Advice"
      
    />
  )
}