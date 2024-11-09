//search bar
import React, { useState } from "react";  

const Fetcher = () => {  
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    async function fetchData() {  
        if (!query) return;

        const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(query)}`;  
        const options = {  
            method: 'GET',  
            headers: {  
                'x-rapidapi-key': 'bb2d21c7demsh9eed1a51924e674p1acbd2jsn8487c9000313', 
                'x-rapidapi-host': 'imdb8.p.rapidapi.com'  
            }  
        };  

        try {  
            const response = await fetch(url, options);  
            const result = await response.json();  
            setData(result.d);
        } catch (error) {  
            console.error("Error fetching data:", error);  
        }  
    }  

    const handleKeyPress = (event) => {  
        if (event.key === 'Enter') {  
            fetchData();  
        }  
    };  

    return (  
        <div>  
            <input  
                type="text"  
                value={query}  
                onChange={(e) => setQuery(e.target.value)}  
                onKeyPress={handleKeyPress}  
                placeholder="Search for a movie..."  
            />  
            <button onClick={fetchData} disabled={!query}>Search</button>
            <h1>Fetched Movies:</h1>  
            {data.length === 0 ? (  
                <p>Please enter a search term to see results.</p> // Message when no results  
            ) : (  
                <ul>  
                    {data.map(movie => (  
                        <li key={movie.id} style={{ display: 'flex', alignItems: 'center' }}>  
                            {movie.i && <img src={movie.i.imageUrl} alt={movie.l} style={{ width: '100px', marginRight: '10px' }} />} {/* Adjust URL path based on actual API response */}  
                            <span>{movie.l}</span>  
                        </li>  
                    ))}  
                </ul>  
            )}  
        </div>  
    );  
}  

export default Fetcher;

