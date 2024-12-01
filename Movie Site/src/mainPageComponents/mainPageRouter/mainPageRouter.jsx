import React from 'react';
import MovieSlider from '../movieSlider';
import TopRatedMovies from '../MostPopularMovies';
import Footer from '../footer';
import MovieList from '../MovieFilter/filteredMovies';
import MoviesContainer from '../mainPageFetch/mainPageFetch';

const MainPageRouterFiles = () => {

            {/* <MovieList /> */}
    return (
        <div>
            <MoviesContainer />
            {/* <MovieSlider />
            <TopRatedMovies /> */}
            <Footer />
        </div>  
    );
};

export default MainPageRouterFiles;