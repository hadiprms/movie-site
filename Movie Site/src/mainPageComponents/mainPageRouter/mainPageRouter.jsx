import React from 'react';
import MovieSlider from '../MovieSlider';
import TopRatedMovies from '../MostPopularMovies';
import Footer from '../footer';

const MainPageRouterFiles = () => {


    return (
        <div>
            <MovieSlider />
            <TopRatedMovies />
            <Footer />
        </div>  
    );
};

export default MainPageRouterFiles;