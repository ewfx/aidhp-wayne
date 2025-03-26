import React from 'react';
import { Box, Text, Stack, Button, Image, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import IMG1 from '../assets/img3.jpg';

const Banner = ({ username }) => {
    const navigate = useNavigate();

    return (
        <Box position={"relative"}   height = {"60vh"} width={"100%"} >
            {username ? (
                <Flex
                    direction="row"
                    align="center"
                    justify="center"
                    width="100%"
                    height=""
                    gap = "0"
                    margin="0"
                    padding="0"
                >
                    <Box flex="1" textAlign="center" backgroundImage={IMG1} backgroundRepeat={"no-repeat"} backgroundSize={"1600px 520px"}>
                        <Text fontSize="4xl" height="60vh" marginTop="25vh" fontWeight="bold" fontFamily="Arial, sans-serif" color={"#D52941"}>
                            Hi {username}, Welcome to WAYNE BANK
                        </Text>
                    </Box>

                    {/* <Box flex="1" textAlign="center" >
                        <Stack direction="row" spacing={4} align="center" justify="center">
                            <Button
                                bg="#D52941"
                                color="white"
                                fontSize="xl"
                                fontWeight="bold"
                                fontFamily="Arial, sans-serif"
                                onClick={() => navigate("/")}
                                colorScheme='red'
                            >
                                Transfer
                            </Button>
                        </Stack>
                    </Box> */}
                </Flex>

            ) : (
                <Flex direction="row" align="center" width={"100%"} justify="center">
                    <Box flex="1" textAlign="center">
                        <Text fontSize="4xl" fontWeight="bold" fontFamily="Arial, sans-serif" color={"#D52941"}>
                            Welcome to WAYNE BANK
                        </Text>
                    </Box>
                    <Box flex="1" textAlign="center">
                        <Login />
                    </Box>
                </Flex>
            )}
        </Box>
    );
};

export default Banner;