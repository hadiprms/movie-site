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
        }, 7000); // Change movie every 7 seconds  
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
        <div className='All-Slider' style={{ backgroundImage: `url(${movies[currentIndex].node.primaryImage.url})`}}>  
            <div className='sliderContainer'>   
                {displayedMovies.map((movie, index) => (  
                    <div key={movie.node.id} className='sliderElement' style={{ left: `${index * 25}%` }}>  
                        <div className='rightAndLeftSide'>  
                            <div className='right-side'>  
                                <div className='sliderImage-container'>  
                                    {movie.node.primaryImage && (  
                                        <img   
                                            src={movie.node.primaryImage.url}   
                                            alt={movie.node.primaryImage.url}   
                                            className='sliderMovie-image'   
                                        />  
                                    )}   
                                </div>  
                            </div>  
                        </div>  
                    </div>  
                ))}  
            </div>  
            {/* Title and Rating Section on the right side */}  
            <div className='titleContainer'>  
                {displayedMovies.length > 0 && (  
                    <div className='sliderInfoHolder'>  
                        <p className='sliderTitleText'>{displayedMovies[0].node.titleText.text}</p>  
                        <p>  
                            {displayedMovies[0].node.releaseYear.year} | 
                            <span className='ratingOfSlider'> {displayedMovies[0].node.ratingsSummary.aggregateRating} /10</span>  
                        </p>
                    </div>  
                )}  
            </div>  
        </div>  
    );
};  

export default MovieSlider;
 