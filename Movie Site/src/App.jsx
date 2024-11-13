import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Fetcher from './mainPageComponents/searchBar'
import TopRatedMovies from './mainPageComponents/MostPopularMovies'
import TopRatedSeries from './mainPageComponents/recentlyUpdatedSeries'
import Footer from './mainPageComponents/footer'

function App() {

  return (
    <>
      <Fetcher />
      <TopRatedMovies />
      <TopRatedSeries />
      <Footer />
    </>
  )
}

export default App
