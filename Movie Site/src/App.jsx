import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Fetcher from './mainPageComponents/searchBar'
import TopRatedMovies from './mainPageComponents/MostPopularMovies'
import TopRatedSeries from './mainPageComponents/recentlyUpdatedSeries'
import Footer from './mainPageComponents/footer'
import MovieSlider from './mainPageComponents/MovieSlider'
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <MovieSlider />
        <TopRatedMovies />
        {/* <TopRatedSeries /> */}
        <Footer />
      </SkeletonTheme>
    </>
  )
}

export default App
