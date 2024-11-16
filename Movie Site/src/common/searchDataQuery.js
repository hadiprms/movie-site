export const searchMoviesFetch = async (query) => {  
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(query)}`;  
    const options = {  
        method: 'GET',  
        headers: {  
            'x-rapidapi-key': '125d8c1e74msh5c8aed26bc65a2ep13faecjsn4dee4b5b9962',  
            'x-rapidapi-host': 'imdb8.p.rapidapi.com'  
        }  
    };  

    try {  
        const response = await fetch(url, options);  
        if (!response.ok) {  
            throw new Error('Network response was not ok');  
        }  
        const result = await response.json();  
        return result.d;
    } catch (error) {  
        console.error("Error fetching data:", error);  
        throw error; 
    }  
};