import React, { useEffect, useState } from 'react';  
import DataQuery from '../common/dataQuery';
import './cssFiles/MostPopularMovies.css'
import MostPopularSkeleton from './skeletonFiles/MostPopularSkeleton';

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
        return <div className='test'><MostPopularSkeleton cards={21}/></div>;  
    }  

    if (error) {  
        return <div>Error: {error}</div>;  
    }  

    return (  
        <div className='All-moviesReturn'>  
            <h1 className='titleHolder'>Most popular on this week:</h1>
            <div className='element'>
                {/* <MostPopularSkeleton cards={21}/> */}
                {movies.slice(0 , 21).map((movie) => {
                    return(
                        <div className='element-div'>
                            <div className='media'>
                                <div className='image-container'>
                                    {movie.node.primaryImage && <img src={movie.node.primaryImage.url} alt={movie.node.primaryImage.url} className='movie-image' />}
                                    <div className='overlay'>                      
                                        {movie.node.titleGenres.genres.slice(0, 1).map((gTitle) => (  
                                                <div>
                                                    <p>{gTitle.genre.text}</p>
                                                </div>
                                            ))} 
                                    </div>
                                </div>
                                <div className='movieInfoHolder'>
                                <p className='movieTitleText'>{movie.node.titleText.text}</p>
                                <p>{movie.node.releaseYear.year} | <span className='ratingOfMovies'>{movie.node.ratingsSummary.aggregateRating} /10</span></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>  
    );  
};  

export default TopRatedMovies;
 