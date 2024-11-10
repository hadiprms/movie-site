import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieFetcher from './API/Data'
import TopRatedMovies from './API'
import TopRatedSeries from './part2'

function App() {

  return (
    <>
      <MovieFetcher />
      <TopRatedMovies />
      <TopRatedSeries />
    </>
  )
}

export default App
