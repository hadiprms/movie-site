import React, { useEffect, useState } from 'react';  
import DataQuery from '../../common/dataQuery';

const MovieList = () => {  
    const [movies, setMovies] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
  
    // Specify which genre you want to filter by here, e.g., "Action"  
    const genreToFilter = 'Action';   
  
    useEffect(() => {  
        const fetchMoviesByGenre = async () => {  
            setLoading(true);  
            try {  
                const popularMovies = await DataQuery.fetchTopRatedMovies();  
                const filteredMovies = [];  
                const genreCheckPromises = popularMovies.results.map(async (movie) => {  
                    const genres = await DataQuery.fetchMovieGenres(movie.id); // movie.id for tconst  
                    if (genres.genres.includes(genreToFilter)) {  
                        filteredMovies.push(movie);  
                    }  
                });  

                // Wait for all genre checks to complete  
                await Promise.all(genreCheckPromises);  
                setMovies(filteredMovies.slice(0, 10)); // Limit to first 10 matching movies  
            } catch (err) {  
                setError(err.message || "Failed to fetch movies.");  
            } finally {  
                setLoading(false);  
            }  
        };  
        fetchMoviesByGenre();  
    }, []);  

    return (  
        <div>  
            <h1>{genreToFilter} Movies</h1>  
            {loading && <p>Loading...</p>}  
            {error && <p>{error}</p>}  
            <div id="movie-results">  
                {movies.length === 0 && !loading && <p>No movies found.</p>}  
                {movies.map((movie) => (  
                    <div key={movie.id}>  
                        <h3>{movie.title}</h3> {/* Adjust according to the actual movie data structure */}  
                        <p>{movie.year}</p> {/* Adjust according to the actual movie data structure */}  
                    </div>  
                ))}  
            </div>  
        </div>  
    );  
};  

export default MovieList;