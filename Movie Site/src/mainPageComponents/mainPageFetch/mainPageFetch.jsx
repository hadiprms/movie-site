import React, { useEffect, useState } from 'react';
import DataQuery from '../../common/dataQuery';
import TopRatedMovies from '../MostPopularMovies';
import MovieSlider from '../movieSlider';
import MostPopularSkeleton from '../skeletonFiles/MostPopularSkeleton';
import Skeleton from 'react-loading-skeleton';
import Footer from '../footer';

const MainPageFetchCall = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await DataQuery.fetchTopRatedMovies(21); // Fetch more if needed for TopRatedMovies  
                setMovies(result.data.movies.edges);
            } catch (err) {
                setError(err.message || "Failed to fetch movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div style={{color: 'white'}}>
                <Skeleton height={800}/>
        </div>
    }

    if (error) {
        return <div></div>;
    }

    return (
        <div>
            <MovieSlider movies={movies} />
            <TopRatedMovies movies={movies} loading={loading}/>
            <Footer />
        </div>
    );
};

export default MainPageFetchCall;