import React, { useEffect, useState } from 'react';  

const TopRatedMovies = () => {  
    const [movies, setMovies] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        const fetchTopRatedMovies = async () => {  
            const url = 'https://imdb8.p.rapidapi.com/title/get-top-rated-movies';  
            const options = {  
                method: 'GET',  
                headers: {  
                    'x-rapidapi-key': 'bb2d21c7demsh9eed1a51924e674p1acbd2jsn8487c9000313',
                    'x-rapidapi-host': 'imdb8.p.rapidapi.com'  
                }  
            };  

            try {  
                const response = await fetch(url, options);  
                if (!response.ok) {  
                    throw new Error(`HTTP error! status: ${response.status}`);  
                }  
                const result = await response.json();  
                setMovies(result.slice(0, 6)); // Store only the top 6 movies  
            } catch (error) {  
                setError(error.message);  
            } finally {  
                setLoading(false); // Set loading to false whether it succeeded or failed  
            }  
        };  
        
        

        fetchTopRatedMovies();  
    }, []); // Empty dependency array means this effect runs once on mount  

    if (loading) {  
        return <div>Loading...</div>;  
    }  

    if (error) {  
        return <div>Error: {error}</div>;  
    }  

    return (  
        <div>  
            <h1>Top 6 Rated Movies</h1>  
            <div id="top-movies">  
                {movies.map(movie => (  
                    <div key={movie.id} className="movie"> {/* Adjust this to match your movie object structure */}  
                        {movie.title} {/* Assuming the movie object has a `title` property */}  
                    </div>  
                ))}  
            </div>  
        </div>  
    );  
};  

export default TopRatedMovies;