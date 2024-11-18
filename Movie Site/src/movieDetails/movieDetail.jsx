import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataQuery from '../common/dataQuery';
import './MovieDetailCss/movieDetail.css'

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const result = await DataQuery.fetchMovieDetail(movieId);
                setMovie(result.data.title);
            } catch (err) {
                setError(err.message || "Failed to fetch movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [movieId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {  
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>No movie found.</div>;
    }

    return (
        <div className='allMovie-Detail'>
            <h1>{movie.titleText.text}</h1>
            <p>{movie.releaseYear.year}</p>
            <p>
            {movie.alternateVersions.edges.slice(0, 1).map((description) => (
                <div>
                    <p>{description.node.text.plainText}</p>
                </div>
            ))}
            </p>
            <p>{movie.runtime.seconds} seconds</p>
            <p>{movie.releaseDate.country.id} country made by</p>
            <img src={movie.primaryImage.url} alt="image" />
        </div>
    );
};

export default MovieDetail;