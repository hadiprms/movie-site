import React, { useEffect, useState } from 'react';
import Fetcher from '../mainPageComponents/searchBar';
import { useNavigate } from 'react-router-dom';
import './errorHandleCss/errorHandle.css'

const ErrorHandler = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };
    return (
        <div>
            <div>
                <h1 style={{color:'orange', textAlign:'center', fontSize:'40px', width:'100%'}}>Error 404: Page Not Found</h1>
            </div>
            <div>
                <button onClick={handleGoHome}>
                    Go to Main Page
                </button>
            </div>
        </div>

            

    );
};


export default ErrorHandler;