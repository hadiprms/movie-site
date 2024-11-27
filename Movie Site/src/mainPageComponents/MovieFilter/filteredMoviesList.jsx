// src/components/GenreList.js  
import React from 'react';  
import { Link } from 'react-router-dom';  

const genres = ['Action', 'Drama', 'Romantic'];  

const GenreList = () => {  
    return (  
        <div>  
            <h1>Select a Genre</h1>  
            <div id="genre-buttons">  
                {genres.map((genre) => (  
                    <Link key={genre} to={`/movies/${genre}`}>  
                        <button>{genre}</button>  
                    </Link>  
                ))}  
            </div>  
        </div>  
    );  
};  

export default GenreList;