import React from 'react';
import MovieSlider from '../movieSlider';
import TopRatedMovies from '../MostPopularMovies';
import Footer from '../footer';
import MovieList from '../MovieFilter/filteredMovies';
import MainPageFetchCall from '../mainPageFetch/mainPageFetch';

const MainPageRouterFiles = () => {

            {/* <MovieList /> */}
    return (
        <div>
            <MainPageFetchCall />
            {/* <MovieSlider />
            <TopRatedMovies /> */}
            {/* <Footer /> */}
        </div>  
    );
};

export default MainPageRouterFiles;