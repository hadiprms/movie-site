import React, { useEffect, useState } from 'react';  
import DataQuery from '../common/dataQuery';  
import './cssFiles/MovieSlider.css';   

const MovieSlider = () => {  
    const [movies, setMovies] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [currentIndex, setCurrentIndex] = useState(0);  

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

    useEffect(() => {  
        const interval = setInterval(() => {  
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (movies.length || 1));  
        }, 3000); // Change movie every 3 seconds  
        return () => clearInterval(interval);  
    }, [movies.length]);  

    if (loading) {  
        return <div>Loading...</div>;  
    }  

    if (error) {  
        return <div>Error: {error}</div>;  
    }  

    const displayedMovies = movies.slice(currentIndex, currentIndex + 4).concat(movies.slice(0, Math.max(0, currentIndex - 4)));

    return (  
        <div className='All-Slider' style={{ backgroundImage: `url(${movies[currentIndex].node.primaryImage.url})` }}>    
            <div className='sliderContainer'> 
                {displayedMovies.map((movie, index) => (  
                    <div key={movie.node.id} className='sliderElement' style={{ left: `${index * 25}%` }}>  
                        <div className='sliderImage-container'>  
                            {movie.node.primaryImage && (  
                                <img   
                                    src={movie.node.primaryImage.url}   
                                    alt={movie.node.titleText.text}   
                                    className='sliderMovie-image'   
                                />  
                            )}   
                        </div>  
                        {/* Only show title and rating for the first displayed movie */}  
                        {index === 0 && (  
                            <div className='leftSide'>
                                <div className='sliderInfoHolder'>  
                                    <p className='sliderTitleText'>{movie.node.titleText.text}</p>  
                                    <p>  
                                        {movie.node.releaseYear.year} |   
                                        <span className='ratingOfSlider'>{movie.node.ratingsSummary.aggregateRating} /10</span>  
                                    </p>  
                                </div>
                                <div className='Sliderverlay'>                      
                                    {movie.node.titleGenres.genres.slice(0, 1).map(gTitle => (  
                                        <div key={gTitle.genre.text}>  
                                            <p>{gTitle.genre.text}</p>  
                                        </div>  
                                    ))}   
                                </div> 
                            </div>
                        )}  
                    </div>  
                ))}  
            </div>  
        </div>  
    );
};  

export default MovieSlider;
 