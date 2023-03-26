import React from 'react'
import Cards from './components/Cards'
import Header from './container/Header/Header'
import HeroSection from './container/HeroSection/HeroSection'

const App = () => {
  return (
    <div className='w-[1466px]'>
      <Header />
      <HeroSection/>
      {/* <Cards/> */}
    </div>
  )
}

export default App
