import React from 'react'
import Cards from './components/Cards'
import ProblemSolving from './components/ProblemSolving'
import Header from './container/Header/Header'
import HeroSection from './container/HeroSection/HeroSection'

const App = () => {
  return (
    <div className='w-[1466px]'>
      <Header />
      <HeroSection/>
      {/* <Cards/> */}
      {/* <ProblemSolving/> */}
    </div>
  )
}

export default App
