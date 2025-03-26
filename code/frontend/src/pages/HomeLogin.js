import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { useState, useEffect } from 'react';
import Carausel from '../components/Carousel';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState("IND001");
    const navigate = useNavigate();
    return (
        <Box>
            <Stack direction="column" spacing={0}>
                <Header display={"block"} username={username} />
                <Banner username={username} />
                <Carausel />
            </Stack>

        </Box>
    );
};

export default Home;