import React, { useState } from "react";  
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
        <div>
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
                <button onClick={fetchData} disabled={!query}>Search</button>
            </div>
            {/* <h1>Fetched Movies:</h1>   */}
            { (  
                <ul>  
                    {data.map(movie => (  
                        <li key={movie.id} style={{ display: 'flex', alignItems: 'center' }}>  
                            {movie.i && <img src={movie.i.imageUrl} alt={movie.l} style={{ width: '100px', marginRight: '10px' }} />}  
                            <span>{movie.l}</span>  
                        </li>  
                    ))}  
                </ul>  
            )}  
        </div>  
    );  
};  

export default Fetcher;