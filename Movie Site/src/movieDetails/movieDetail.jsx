// src/components/MovieDetail.js  
import React from 'react';
import { useParams } from 'react-router-dom';


const MovieDetail = () => {
    const { movieId } = useParams();

    return (  
        <div>  
            <h1>Movie Detail</h1>  
            <p>Movie ID: {movieId}</p>
        </div>
    );
};

export default MovieDetail;