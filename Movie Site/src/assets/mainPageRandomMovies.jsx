import React, { useEffect, useState } from 'react';  
import axios from 'axios';  

const RandomMovies = () => {  
  const [movies, setMovies] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {  
    const fetchRandomMovies = async () => {  
      try {  
        const response = await axios.get('https://api.example.com/random-movies'); // Replace with your API endpoint  
        setMovies(response.data); // Assuming your API returns an array of movies  
      } catch (err) {  
        setError('Failed to fetch movies');  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchRandomMovies();  
  }, []);  

  return (  
    <div>  
      <h1>Random Movies</h1>  
      {loading && <div>Loading...</div>}  
      {error && <div>{error}</div>}  
      <ul>  
        {movies.map(movie => (  
          <li key={movie.id}>  
            <h2>{movie.title}</h2>  
            <p>{movie.description}</p>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default RandomMovies;