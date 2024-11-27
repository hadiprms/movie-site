class DataQuery {
    static async fetch(url){
        try{
            const options = {  
                method: 'GET',  
                headers: {  
                    'x-rapidapi-key': '0dd6d2924cmsh029dbcd6162f2b6p1eca82jsn4aa5d33ac167',
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
        const result = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=42&country=US&language=en-US')
        return result;
    }
    // static async fetchTopRatedSeries(){
    //     const resultOfSeries = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=8&country=US&language=en-US')
    //     return resultOfSeries;
    // }
    // static async fetchMovieGenres(){
    //     const resultOfFetchMovieGenres = await DataQuery.fetch(`https://imdb8.p.rapidapi.com/title/v2/get-genres?tconst=${tconst}&country=US&language=en-US`)
    //     return resultOfFetchMovieGenres;
    // } baraye genre filtering
    static async fetchMovieDetail(movieId){
        const resultOfDetail = await DataQuery.fetch(`https://imdb8.p.rapidapi.com/title/v2/get-details?tconst=${movieId}&country=US&language=en-US`)
        return resultOfDetail;
    }
}

export default DataQuery;