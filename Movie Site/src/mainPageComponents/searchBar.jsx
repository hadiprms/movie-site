import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMoviesFetch } from "../common/searchDataQuery";
import './cssFiles/searchBar.css';

const Fetcher = () => {  
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const fetchData = async (searchQuery) => {
        if (!searchQuery) {
            setData([]);
            setShowResults(false);
            return;
        }

        try {
            const result = await searchMoviesFetch(searchQuery);
            setData(result);
            setShowResults(result.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    return (
        <div style={{ position: 'relative' }}>
            <div className="siteNameAndInput">
                <div className="siteName">
                    <p>Best <span>Movies</span><img src="https://img.icons8.com/?size=100&id=11139&format=png&color=FD7E14" alt="image" /></p>  
                </div>
                <div className="searchBar-inputAndButton">
                    <input  
                        type="text"  
                        value={query}  
                        onChange={(e) => setQuery(e.target.value)}  
                        placeholder="Search for a movie..."  
                    />  
                    <button onClick={() => fetchData(query)} disabled={!query}>Search</button>
                </div>
            </div>
            {showResults && (
                <ul className="searchResult"> 
                    {data.slice(0, 4).map(movie => (
                        <li key={movie.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
                            <Link to={`/movie/${movie.id}`}>
                                <div className="searchResult-Info">
                                    {movie.i && <img src={movie.i.imageUrl} alt={movie.l} style={{ width: '100px', marginBottom: '10px' }} />}
                                    <span style={{ textAlign: 'center' }}>{movie.l}</span>
                                </div>
                            </Link>
                        </li>  
                    ))}  
                </ul>  
            )}  
        </div>  
    );  
};  

export default Fetcher;
 