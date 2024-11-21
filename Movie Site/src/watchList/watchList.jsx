import React, { useEffect, useState } from 'react';  
import DataQuery from '../common/dataQuery';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="watchlist-container">
            <h1>Your Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty. Start adding movies!</p>
            ) : (
                <ul>
                    {watchlist.map((movieId) => {
                        const movieDetails = getMovieDetails(movieId);
                        return movieDetails ? (
                            <li key={movieId}>
                                <h3 style={{ color: 'white' }}>{movieDetails.title}</h3>
                                <p style={{ color: 'white' }}>
                                    {movieDetails.year} | Rating: {movieDetails.rating} / 10
                                </p>
                                {movieDetails.primaryImage && <img src={movieDetails.primaryImage} alt={movieDetails.title} style={{ width: '100px' }} />}  
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </div>
    );
};

export default WatchlistPage;