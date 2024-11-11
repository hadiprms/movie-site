import React, { useEffect, useState } from 'react';  
import DataQuery from '../common/dataQuery';

const TopRatedMovies = () => {  
    const [movies, setMovies] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

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

    if (loading) {  
        return <div>Loading...</div>;  
    }  

    if (error) {  
        return <div>Error: {error}</div>;  
    }  

    return (  
        <div>  
            <h1>Most popular on this week</h1>  
            <div id="top-movies">  
                {movies.map(movie => (  
                    <li style={{ display: 'inline', alignItems: 'center' }}>
                        {movie.node.primaryImage && <img src={movie.node.primaryImage.url} alt={movie.node.primaryImage.url} style={{ width: '100px', marginRight: '10px' }} />}
                        {/* <span>{movie.node.metacritic.metascore}</span> had problem in code.try to fix it */}
                        {/* <span>{movie.node.titleText.text}</span> have to set display for names to be under the images.when you do this uncommand this line. */}
                    </li>
                ))}  
            </div>  
        </div>  
    );  
};  

export default TopRatedMovies;