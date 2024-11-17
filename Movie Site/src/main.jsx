import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Fetcher from './mainPageComponents/searchBar'
import TopRatedMovies from './mainPageComponents/MostPopularMovies'
import TopRatedSeries from './mainPageComponents/recentlyUpdatedSeries'
import Footer from './mainPageComponents/footer'
import MovieSlider from './mainPageComponents/MovieSlider'
import { SkeletonTheme } from 'react-loading-skeleton'

function Main() {

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

export default Main;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
