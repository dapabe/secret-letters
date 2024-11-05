"use client"
import { useLetterStore } from '#/stores/letter.store'
import { IconHome, IconWritingSign } from '@tabler/icons-react'
import Link from 'next/link'

export const MobileBar = () => {
  const {toggleModal} = useLetterStore()
  return (
    <nav className='btm-nav md:hidden'> 
      <Link href='/' >
        <IconHome/>
        <span className="btm-nav-label">Inicio</span>
      </Link>
      <button onClick={toggleModal}>
        <IconWritingSign/>
        <span className="btm-nav-label">Redactar</span>
      </button>
    </nav>
  )
}
