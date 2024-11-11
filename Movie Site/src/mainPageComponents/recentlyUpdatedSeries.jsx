import React, { useEffect, useState } from 'react';  
import DataQuery from '../common/dataQuery';
import './cssFiles/recentlyUpdatedSeries.css'

const TopRatedSeries = () => {  
    const [series, setSeries] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        const fetchSeries = async () => {  
            try {  
                const result = await DataQuery.fetchTopRatedSeries();  
                setSeries(result.data.tv.edges);   
            } catch (err) {  
                setError(err.message || "Failed to fetch series.");  
            } finally {  
                setLoading(false);  
            }  
        };  
        fetchSeries();  
    }, []);  

    if (loading) {  
        return <div>Loading...</div>;  
    }  

    if (error) {  
        return <div>Error: {error}</div>;  
    }  

    return (  
        <div className='All-seriesReturn'>  
            <h1 className='titleHolder'>Recently updated series:</h1>
            <div className='element'>
                {series.map((tv) => {
                    return(
                        <div className='element-div'>
                            <div className='image-container'>
                                {tv.node.primaryImage && <img src={tv.node.primaryImage.url} alt={tv.node.primaryImage.url} style={{ width: '150px' , height: '230px', marginRight: '10px' }} className='series-image' />}
                                <div className='overlay'>                      
                                    {tv.node.titleGenres.genres.slice(0, 1).map((gTitle) => (  
                                            <div>
                                                <p>{gTitle.genre.text}</p>
                                            </div>
                                        ))} 
                                </div>
                            </div>
                            <div className='seriesInfoHolder'>
                            <p className='seriesTitleText'>{tv.node.titleText.text}</p>
                            <p>{tv.node.releaseYear.year} | <span className='ratingOfSeries'>{tv.node.ratingsSummary.aggregateRating} /10</span></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>  
    );  
};  

export default TopRatedSeries;