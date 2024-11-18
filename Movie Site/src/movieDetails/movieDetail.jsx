import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailCss/movieDetail.css'

const MovieDetail = () => {
    const {movieId} = useParams();

    return (
        <div className='allMovie-Detail'>
            <h1>Movie Detail</h1>
            <p>Movie ID: {movieId}</p>
        </div>  
    );
};

export default MovieDetail;