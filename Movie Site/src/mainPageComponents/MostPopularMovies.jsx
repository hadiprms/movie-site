import React, { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';  
import DataQuery from '../common/dataQuery';  
import MostPopularSkeleton from './skeletonFiles/MostPopularSkeleton';  
import './cssFiles/MostPopularMovies.css';  

const TopRatedMovies = () => {  
    const [movies, setMovies] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [displayCount, setDisplayCount] = useState(21);
    const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || []);

    useEffect(() => {  
        const fetchMovies = async () => {  
            try {  
                const result = await DataQuery.fetchTopRatedMovies();
                setMovies(result.data.movies.edges);
            } catch (err) {  
                setError(err.message || "Failed to fetch movies.");  
            } finally {  
                setLoading(false);  
            }  
        };  
        fetchMovies();
    }, []);  

    const toggleMovieInWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.includes(movieId)
            ? watchlist.filter(id => id !== movieId) // Remove from watchlist 
            : [...watchlist, movieId]; // Add to watchlist
            
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    const loadMoreMovies = () => {
        setDisplayCount(prevCount => prevCount + 21);
    };

    const isMovieInWatchlist = (movieId) => {
        return watchlist.includes(movieId);
    };

    if (error) {  
        return <div>Error: {error}</div>;  
    }  

    return (  
        <div className='All-moviesReturn'>  
            <h1 className='titleHolder'>Most popular this week:</h1>
            <div className='element'>
                {loading && <MostPopularSkeleton cards={21} />}
                {movies.slice(0, displayCount).map((movie) => {
                    const movieId = movie.node.id;

                    return (
                        <div className='element-div' key={movieId}>
                            <Link to={`/movie/${movieId}`} className='media'>
                                <div className='image-container'>
                                    {movie.node.primaryImage && <img src={movie.node.primaryImage.url} alt={movie.node.primaryImage.url} className='movie-image' />}  
                                    <div className='overlay'>
                                        {movie.node.titleGenres.genres.slice(0, 1).map((gTitle) => (
                                            <div key={gTitle.genre.text}>
                                                <p>{gTitle.genre.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='movieInfoHolder'>
                                    <p className='movieTitleText'>{movie.node.titleText.text}</p>
                                    <p>
                                        <span className='releaseYearOfMovies'>{movie.node.releaseYear.year} | </span>
                                        <span className='ratingOfMovies'>{movie.node.ratingsSummary.aggregateRating} /10</span>
                                    </p>
                                </div>
                            </Link>
                            <button className='ButtonRemove'
                                type='button'
                                onClick={() => toggleMovieInWatchlist(movieId)}
                                style={{ backgroundColor: isMovieInWatchlist(movieId) ? 'red' : undefined }}
                            >
                                {isMovieInWatchlist(movieId) ? 'Remove Watchlist' : 'Add to Watchlist'}
                            </button>
                        </div>
                    );
                })}
            </div>
            {movies.length > displayCount && (
                <button className='addMoreButton' onClick={loadMoreMovies}>Load More</button>
            )}
            <div>
                <Link to="/watchlist">
                    <button>View Watchlist</button>
                </Link>
            </div>
        </div>  
    );  
};  

export default TopRatedMovies;