import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import Fetcher from './mainPageComponents/searchBar'
import TopRatedMovies from './mainPageComponents/MostPopularMovies'
import TopRatedSeries from './mainPageComponents/recentlyUpdatedSeries'
import Footer from './mainPageComponents/footer'
import MovieSlider from './mainPageComponents/movieSlider.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'
import MovieDetail from './MovieDetails/movieDetail.jsx'
import MainPageRouterFiles from './mainPageComponents/mainPageRouter/mainPageRouter.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorHandler from './errorHandler/errorHandler.jsx'
import WatchlistPage from './watchList/watchList.jsx'
import FeedbackForm from './feedback/feedback.jsx'
import MovieList from './mainPageComponents/MovieFilter/filteredMovies.jsx'
// import GenreForm from './mainPageComponents/MovieFilter/movieGenre.jsx'
// Get a reference to the root DOM element  
const container = document.getElementById('root'); // Adjust if your root ID is different  

// Create a root for the React app  
const root = ReactDOM.createRoot(container); 
function Main() {

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Router>
            <Routes>
                <Route path="/" element={<MainPageRouterFiles />} />
                <Route path="/movie/:movieId" element={<MovieDetail />} />
                <Route path="/watchlist" element={<WatchlistPage />} /> 
                <Route path="/feedback" element={<FeedbackForm/>}/>
                <Route path="/movies/:genre" element={<MovieList/>} /> 
                {/* <Route path="/genre" element={<GenreForm/>}/> */}
                <Route path="*" element={<ErrorHandler />}/>
            </Routes>
        </Router>
      </SkeletonTheme>
    </>
  )
}

export default Main;

root.render(
    <App />
)
