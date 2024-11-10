import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieFetcher from './API/Data'
import TopRatedMovies from './API'

function App() {

  return (
    <>
      <MovieFetcher />
      <TopRatedMovies />
    </>
  )
}

export default App
