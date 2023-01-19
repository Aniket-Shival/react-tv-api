import React from 'react'
import NavigationBar from '../components/NavigationBar'
import TvCards from '../components/TvCards'

const Home = () => {
  return (
    <div style={{ backgroundColor:'#202430' }}>
        <NavigationBar/>
        <TvCards />
    </div>
  )
}

export default Home