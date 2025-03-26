import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { useState, useEffect } from 'react';
import Carausel from '../components/Carousel';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8888/api/users/login', {
    //                 method: 'GET',
    //                 credentials: 'include',
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUsername(data.username);
    //             } else {
    //                 setUsername(null);
    //             }
    //         } catch (error) {
    //             console.error('Error checking login status:', error);
    //             setUsername(null);
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUsername(data.username);
    //             } else {
    //                 setUsername(null);
    //             }
    //         } catch (error) {
    //             console.error('Error checking login status:', error);
    //             setUsername(null);
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);
    //     checkLoginStatus();
    // }, []);

    return (
        <Box>
                                        <Stack direction="column" spacing={5}>
                                <Header />
                                <Banner />
                            </Stack>
                      

        </Box>
    );
};

export default Home;