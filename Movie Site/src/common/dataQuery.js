class DataQuery {
    static async fetch(url){
        try{
            const options = {  
                method: 'GET',  
                headers: {  
                    'x-rapidapi-key': '13d36acf19mshffe07a8a0a584bfp198690jsn19f1243d441c',
                    'x-rapidapi-host': 'imdb8.p.rapidapi.com'  
                }  
            }; 
            const response = await fetch(url, options);  
            if (!response.ok) {  
                throw new Error(`Error : ${response.statusText}`);  
            }  
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:" , error)
            throw error;
        }
    }
    static async fetchTopRatedMovies(){
        const result = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=21&country=US&language=en-US')
        return result;
    }
    static async fetchTopRatedSeries(){
        const resultOfSeries = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=8&country=US&language=en-US')
        return resultOfSeries;
    }
    static async fetchMovieDetail(movieId){
        const resultOfDetail = await DataQuery.fetch(`https://imdb8.p.rapidapi.com/title/v2/get-details?tconst=${movieId}&country=US&language=en-US`)
        return resultOfDetail;
    }
}

export default DataQuery;