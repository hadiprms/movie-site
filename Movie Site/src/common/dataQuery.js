class DataQuery {
    static async fetch(url){
        try{
            const options = {  
                method: 'GET',  
                headers: {  
                    'x-rapidapi-key': '3c1ce45a3amshf794de125d7d9a4p1c2be4jsn21fa0acb56ad',
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
        const result = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=84&country=US&language=en-US')
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