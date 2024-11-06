import React, { useState } from 'react';
import axios from 'axios';  

export default function MovieFetcher() {  
    const  [title, setTitle]=useState("")
    const [movieTitle, setMovieTitle]=useState(null)

    const fetchData = () => {
        axios.get(`http://www.omdbapi.com/?apikey=7078e70f&t=${title}`).then((res)=>{
            setMovieTitle(res.data)
        })
    }
    
        return(
            <div>
                <input type="text" placeholder='title' 
                onChange={(event)=>{
                    setTitle(event.target.value);
                }}/>
                <button onClick={fetchData}>search</button>
                <h1>your title is: {movieTitle?.Title}</h1>
                <h1>your realse year is: {movieTitle?.Year}</h1>
                <h1>your genre is: {movieTitle?.Genre}</h1>
            </div>
        );
    }