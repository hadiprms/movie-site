import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailCss/movieDetail.css'

const MovieDetail = () => {
    const { movieId, title, imageUrl, releaseYear } = useParams();

    return (
        <div className='allMovie-Detail'>
            <h1>Movie Detail</h1>
            <p>Movie ID: {movieId}</p>
            {title && <h2>{title}</h2>}
            {<img src={decodeURIComponent(imageUrl)} alt={title} className='movie-detail-image' />}
            {releaseYear && <p>Release Year: {releaseYear}</p>}
        </div>  
    );
};

export default MovieDetail;