class DataQuery {
    static async fetch(url){
        try{
            const options = {  
                method: 'GET',  
                headers: {  
                    'x-rapidapi-key': 'bb2d21c7demsh9eed1a51924e674p1acbd2jsn8487c9000313',
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
        const result = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=6&country=US&language=en-US')
        return result;
    }
    static async fetchTopRatedSeries(){
        const resultOfSeries = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=6&country=US&language=en-US')
        return resultOfSeries;
    }
}

export default DataQuery;