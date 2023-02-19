'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Navbar from './components/Navbar'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'

export default function Home() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  return (
    <main>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
        <RestaurantCard />
      </div>
    </main>
  )
}
