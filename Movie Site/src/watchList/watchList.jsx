import React, { useEffect, useState } from 'react';  
import DataQuery from '../common/dataQuery';
import './watchListCss/watchList.css'
const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(storedWatchlist);

        const fetchMovies = async () => {
            try {
                const result = await DataQuery.fetchTopRatedMovies();
                setMovies(result.data.movies.edges);
            } catch (err) {
                console.error("Failed to fetch movies.", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const getMovieDetails = (movieId) => {
        const movie = movies.find(m => m.node.id === movieId);
        return movie ? {
            title: movie.node.titleText.text,
            year: movie.node.releaseYear.year,
            primaryImage: movie.node.primaryImage ? movie.node.primaryImage.url : null,
            rating: movie.node.ratingsSummary.aggregateRating,
        } : null;
    };

    const removeMovie = (movieId) => {
        const updatedWatchlist = watchlist.filter(id => id !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className='watchListTitle' style={{color:'white'}}>Your Watchlist</h1>
            <div className="watchlist-container">
                {watchlist.length === 0 ? (
                    <p>Your watchlist is empty. Start adding movies!</p>
                ) : (
                    <ul>
                        {watchlist.map((movieId) => {
                            const movieDetails = getMovieDetails(movieId);
                            return movieDetails ? (
                                <div className='AllMoviesInfo' key={movieId}>
                                    <div className='test'>
                                    {movieDetails.primaryImage && <img src={movieDetails.primaryImage} alt={movieDetails.title} style={{ width: '100px' }} />} 
                                    <h3 className='watchlistMovieTitle' style={{ color: 'white' }}>{movieDetails.title}</h3>
                                    <button className='removeButton' onClick={() => removeMovie(movieId)}>Remove</button>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

export default WatchlistPage;