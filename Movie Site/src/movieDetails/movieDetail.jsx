import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataQuery from '../common/dataQuery';
import './MovieDetailCss/movieDetail.css'
import Fetcher from '../mainPageComponents/searchBar';
import Footer from '../mainPageComponents/footer';

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
        <div>
            <Fetcher />
            <div className='all-movieDetail'>
                <div className='DetailImage'>
                    <img src={movie.primaryImage.url} alt="image" />
                </div>
                <div className='DetailDescription'>
                    <h1 className='D-Title'>{movie.titleText.text}</h1>
                    <div className='D-YearAndTime'>
                        <p>Reales Year: {movie.releaseYear.year}</p>
                        <p className='D-Time'>{movie.runtime.seconds/60} Minutes</p>
                    </div>
                    <p className='D-MadeBy'>Made By: {movie.releaseDate.country.id}</p>
                    <p className='D-Description'>
                    {movie.alternateVersions.edges.slice(0, 1).map((description) => (
                        <div>
                            <p><span>Descripton:</span> {description.node.text.plainText}</p>
                        </div>
                    ))}
                    </p>
                    <div className='test'>
                        <button className='leftButton'>Watch it online</button>
                        <button className='rightButton'>Download now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;