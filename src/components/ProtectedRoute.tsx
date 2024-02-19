// src/components/ProtectedRoute.js
import React, { useState, useEffect } from 'react';
import AllProducts from './AllProducts';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                try {
                    const response = await fetch('https://dummyjson.com/auth/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': accessToken,
                        },
                    });

                    if (response.ok) {
                        setIsAuthenticated(true);
                    }
                    console.log(accessToken);

                } catch (error) {
                    // Handle error if needed
                    console.error('Error checking authentication:', error);
                }
            }
            setIsLoading(false);
        };
        checkAuthentication();
    }, []);

    if (isLoading) {
        // You might want to render a loading spinner or a different component while checking authentication
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isAuthenticated ? <AllProducts /> : (
                <div>
                    <p><a href="/Login">Login First</a></p>
                </div>
            )}
        </div>
    );
};

export default ProtectedRoute;
