import React, { useState } from 'react';
import axios from 'axios';  

export default function MovieFetcher() {  
    const  [title, setTitle]=useState("")
    const [movieTitle, setMovieTitle]=useState(0)

    const fetchData = () => {
        axios.get(`http://www.omdbapi.com/?apikey=7078e70f&t=${title}`).then((res)=>{
            setMovieTitle(res.data.Title)
        })
    }
    
        return(
            <div>
                <input type="text" placeholder='title' 
                onChange={(event)=>{
                    setTitle(event.target.value);
                }}/>
                <button onClick={fetchData}>search</button>
                <h1>your title is: {movieTitle}</h1>
            </div>
        );
    }