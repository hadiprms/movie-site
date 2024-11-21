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

    const addMovieToWatchlist = (movieId) => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        // Check if movieId is already in the watchlist
        if (!storedWatchlist.includes(movieId)) {
            storedWatchlist.push(movieId);
            localStorage.setItem('watchlist', JSON.stringify(storedWatchlist));
        }
    };
    const loadMoreMovies = () => {
        setDisplayCount(prevCount => prevCount + 21);
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
                                        <span className='realseYearOfMobies'>{movie.node.releaseYear.year} | </span>
                                        <span className='ratingOfMovies'>{movie.node.ratingsSummary.aggregateRating} /10</span>  
                                    </p>
                                </div>
                            </Link>
                            <button type='button' onClick={() => addMovieToWatchlist(movieId)}>Add to Watchlist</button>
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