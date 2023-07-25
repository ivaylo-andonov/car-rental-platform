"use client"

import { FC } from 'react'
import CustomButton from './CustomButton'
import Image from 'next/image'

interface HeroProps {

}

const Hero: FC<HeroProps> = ({ }) => {
  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>
          Find, book or rent a car - quickly and easily!
        </h1>
        <p className='hero__subtitle'>
          Streamline your car rental experience with our effortless booking process.
        </p>
        <CustomButton
          btnType='button'
          title='Explore cars'
          handleClick={() => { }}
          containerStyles='bg-primary-blue text-white rounded-full mt-10'
        />
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src="/hero.png" alt='hero' fill priority className='object-contain' />
        </div>
        <div className='hero__image-overlay'></div>
      </div>
    </div>)
}

export default Hero