export const searchMoviesFetch = async (query) => {  
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(query)}`;  
    const options = {  
        method: 'GET',  
        headers: {  
            'x-rapidapi-key': '7e166b8202msh3a94c1a60b79768p1ed15djsnd81690b60456',  
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