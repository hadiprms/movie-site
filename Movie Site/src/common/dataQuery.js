class DataQuery {
    static async fetch(url){
        try{
            const options = {  
                method: 'GET',  
                headers: {  
                    'x-rapidapi-key': 'fcbb3addc9msh1e373a7cd345f32p1ebc34jsnc74392565253',
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
        const result = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=8&country=US&language=en-US')
        return result;
    }
    static async fetchTopRatedSeries(){
        const resultOfSeries = await DataQuery.fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=8&country=US&language=en-US')
        return resultOfSeries;
    }
}

export default DataQuery;