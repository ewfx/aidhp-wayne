import { Box, Button, Stack, Text, Image} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import userImage from '../assets/user.png';


const Header = ({username}) => {
    const navigate = useNavigate();
    return (
        <Box color="white" bg="#D52941" p={4} width={"100%"} top={0} zIndex={0} height={"60px"} right={0}>
            <Stack direction="row" spacing={4} align="center" justify="space-between">
                <Text fontSize="2xl" fontWeight="bold" fontFamily="Arial, sans-serif" textAlign={'left'}>
                    WAYNE BANK
                </Text>
                {username ? (
                    <Stack direction="row" spacing={4} align="center">
                        <Box 
            overflow="hidden" 
            borderRadius="full">
                            <Image
                                borderRadius='full'
                                boxSize='4.5ex'
                                src={userImage}
                                alt='User'
                                onClick={() => navigate("/profile")}
                            />
                            </Box>
                    </Stack>
                ) : (
                    <Stack direction="row" spacing={4} align="center">

                    </Stack>
                )}
            </Stack>
        </Box>
    );
};

export default Header;