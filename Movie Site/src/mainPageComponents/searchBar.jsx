import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { searchMoviesFetch } from "../common/searchDataQuery";
import './cssFiles/searchBar.css'
const Fetcher = () => {  
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async () => {  
        if (!query) return;  

        try {  
            const result = await searchMoviesFetch(query);  
            setData(result);
        } catch (error) {  
            console.error("Error fetching data:", error);  
        }  
    };  

    const handleKeyPress = (event) => {  
        if (event.key === 'Enter') {  
            fetchData();  
        }  
    };  

    return (  
        <div style={{ position: 'relative'}}>
            <div className="siteNameAndInput">
                <div className="siteName">
                    <p>Best <span>Movies</span><img src="https://img.icons8.com/?size=100&id=11139&format=png&color=FD7E14" alt="image"/></p>
                </div>
                <div className="searchBar-inputAndButton">
                    <input  
                        type="text"  
                        value={query}  
                        onChange={(e) => setQuery(e.target.value)}  
                        onKeyPress={handleKeyPress}  
                        placeholder="Search for a movie..."  
                    />  
                    <button onClick={fetchData} disabled={!query}>search</button>
                </div>
            </div>
            {(  
                <ul className="searchResult" style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0, alignItems: 'center' }}>  
                    {data.map(movie => (  
                        <li key={movie.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
                            <Link to={`/movie/${movie.id}`}>
                            {movie.i && <img src={movie.i.imageUrl} alt={movie.l} style={{ width: '100px', marginBottom: '10px' }} />}
                            <span style={{ textAlign: 'center' }}>{movie.l}</span>
                            </Link>
                        </li>  
                    ))}  
                </ul>  
            )}  
        </div>  
    );  
};  

export default Fetcher;
 