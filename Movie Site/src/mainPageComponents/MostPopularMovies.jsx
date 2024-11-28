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
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);  // State to hold unique genres  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility  

    useEffect(() => {  
        const fetchMovies = async () => {  
            try {  
                const result = await DataQuery.fetchTopRatedMovies();
                setMovies(result.data.movies.edges);
                
                // Extract unique genres from fetched movies  
                const uniqueGenres = new Set();
                result.data.movies.edges.forEach(movie => {
                    movie.node.titleGenres.genres.forEach(g => uniqueGenres.add(g.genre.text));
                });
                setGenres(Array.from(uniqueGenres)); // Convert Set to Array for state  
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

    const filterMoviesByGenre = (movies, genre) => {
        return genre ? movies.filter(movie => movie.node.titleGenres.genres.some(g => g.genre.text === genre)) : movies
    };

    if (error) {  
        return <div>Error: {error}</div>;  
    }  

    const filteredMovies = filterMoviesByGenre(movies, selectedGenre);

    return (  
        <div className='All-moviesReturn'>  
            <div className='titleHolder'>
                <h2 style={{marginBottom: '1%'}}>Most popular this week:</h2>

            {/* Single button for dropdown genre selection */}  
            <div
                className="genre-dropdown"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <button className="main-genre-button">
                    {selectedGenre || 'Select Genre'}
                </button>
                {isDropdownOpen && (
                    <div className="genre-options">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => {
                                    setSelectedGenre(genre);
                                    setIsDropdownOpen(false); // Close dropdown after selection  
                                }}
                                className={'genre-button'}
                            >
                                {genre}
                            </button>
                        ))}
                        <button
                            className='genre-button'
                            onClick={() => {
                                setSelectedGenre('');
                                setIsDropdownOpen(false); // Close dropdown after reset  
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
            </div>


            <div className='element'>
                {loading && <MostPopularSkeleton cards={21} />}
                {filteredMovies.slice(0, displayCount).map((movie) => {
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
                                        <span className='ratingOfMovies'>{movie.node.ratingsSummary.aggregateRating ?? '-'} /10</span>
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
            {filteredMovies.length > displayCount && (
                <button className='addMoreButton' onClick={loadMoreMovies}>Load More</button>
            )}
        </div>  
    );  
};  

export default TopRatedMovies;