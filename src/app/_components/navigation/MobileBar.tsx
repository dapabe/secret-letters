"use client"
import { useLetterStore } from '#/stores/letter.store'
import { HomeIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const MobileBar = () => {
  const {toggleModal} = useLetterStore()
  return (
    <nav className='btm-nav md:hidden'> 
      <Link href='/' >
        <HomeIcon/>
        <span className="btm-nav-label">Inicio</span>
      </Link>
      <button onClick={toggleModal}>
        <PencilIcon/>
        <span className="btm-nav-label">Redactar</span>
      </button>
    </nav>
  )
}
