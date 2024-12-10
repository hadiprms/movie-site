// TopRatedMovies.test.js  

import React from 'react';  
import { render, screen, fireEvent } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom'; 
import TopRatedMovies from '../mainPageComponents/MostPopularMovies';  
import { favoriteMoviesReducer, initialState } from '../mainPageComponents/favoriteMoviesReducer';  
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach } from 'vitest';  

// Mocking the data to be passed into the TopRatedMovies component  
const mockMovies = [  
    {  
        node: {  
            id: "1",  
            titleText: { text: "Movie One" },  
            primaryImage: { url: "http://image1.jpg" },  
            releaseYear: { year: 2022 },  
            ratingsSummary: { aggregateRating: 8.5 },  
            titleGenres: { genres: [{ genre: { text: "Action" } }] },  
        },  
    },  
    {  
        node: {  
            id: "2",  
            titleText: { text: "Movie Two" },  
            primaryImage: { url: "http://image2.jpg" },  
            releaseYear: { year: 2023 },  
            ratingsSummary: { aggregateRating: 9.0 },  
            titleGenres: { genres: [{ genre: { text: "Drama" } }] },  
        },  
    },  
];  

describe('TopRatedMovies Component Tests', () => {  

    test('renders movies correctly', () => {  
        render( 
                <TopRatedMovies movies={mockMovies} />  
        );  

        // Check if the movie titles are rendered  
        expect(screen.getByText(/Movie One/i)).toBeInTheDocument();  
        expect(screen.getByText(/Movie Two/i)).toBeInTheDocument();  
    });  

    // test('filters movies by selected genre', () => {  
    //     render(  
    //         <MemoryRouter>  
    //             <TopRatedMovies movies={mockMovies} />  
    //         </MemoryRouter>  
    //     );  

    //     // Select the genre "Action" from the dropdown  
    //     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Action' } });  
        
    //     // Ensure only Action movies are displayed  
    //     expect(screen.getByText(/Movie One/i)).toBeInTheDocument();  
    //     expect(screen.queryByText(/Movie Two/i)).toBeNull();  
    // });  

    // test('adds movie to favorites', () => {  
    //     render(  
    //         <MemoryRouter>  
    //             <TopRatedMovies movies={mockMovies} />  
    //         </MemoryRouter>  
    //     );  

    //     // Example for adding to favorites - you need a button or similar in your component for the test to validate  
    //     fireEvent.click(screen.getByRole('button', { name: /Add to Favorites/i }));  

    //     // Check if the button changes to 'Remove from Favorites' (this assumes such a functionality is implemented)  
    //     expect(screen.getByText(/Remove from Favorites/i)).toBeInTheDocument();  
    // });  

    // test('removes movie from favorites', () => {  
    //     render(  
    //         <MemoryRouter>  
    //             <TopRatedMovies movies={mockMovies} />  
    //         </MemoryRouter>  
    //     );  

    //     // Add Movie One to favorites  
    //     fireEvent.click(screen.getByRole('button', { name: /Add to Favorites/i }));  

    //     // Then remove it  
    //     fireEvent.click(screen.getByText(/Remove from Favorites/i));  

    //     // Check to see if the button changes back  
    //     expect(screen.getByText(/Add to Favorites/i)).toBeInTheDocument();  
    // });  

    // test('renders loading state correctly', () => {  
    //     const { rerender } = render(  
    //         <MemoryRouter>  
    //             <TopRatedMovies movies={[]} />  
    //         </MemoryRouter>  
    //     );  

    //     // Initially no movies should be displayed  
    //     expect(screen.queryByText(/Movie One/i)).toBeNull();  
        
    //     // Rerender with mock movies  
    //     rerender(  
    //         <MemoryRouter>  
    //             <TopRatedMovies movies={mockMovies} />  
    //         </MemoryRouter>  
    //     );  

    //     // Ensure movies render after loading  
    //     expect(screen.getByText(/Movie One/i)).toBeInTheDocument();  
    // });  

});  