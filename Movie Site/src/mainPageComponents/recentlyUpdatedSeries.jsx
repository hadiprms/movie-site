import React, { useEffect, useState } from 'react';  
import DataQuery from '../common/dataQuery';  

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
        <div>  
            <h1>Recently updated top series</h1>  
            <div id="top-series">  
                {series.map(tv => (  
                    <li style={{ display: 'inline', alignItems: 'center' }}>
                        {tv.node.primaryImage && <img src={tv.node.primaryImage.url} alt={tv.node.primaryImage.url} style={{ width: '100px', marginRight: '10px' }} />}
                        {/* <span>{tv.node.metacritic.metascore}</span> had problem in code.try to fix it */}
                        {/* <span>{tv.node.titleText.text}</span> have to set display for names to be under the images.when you do this uncommand this line. */}
                    </li>
                ))}  
            </div>  
        </div>  
    );  
};  

export default TopRatedSeries;