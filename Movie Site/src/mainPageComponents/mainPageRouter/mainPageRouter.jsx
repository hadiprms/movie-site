import React from 'react';
import MovieSlider from '../MovieSlider';
import TopRatedMovies from '../MostPopularMovies';
import Footer from '../footer';
import MovieList from '../MovieFilter/filteredMovies';

const MainPageRouterFiles = () => {


    return (
        <div>
            <MovieSlider />
            <MovieList />
            <TopRatedMovies />
            <Footer />
        </div>  
    );
};

export default MainPageRouterFiles;