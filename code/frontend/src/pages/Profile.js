import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Box, Center, Flex, Input, InputGroup, Button, InputRightElement, Tabs, TabList, TabPanels, Tab, TabPanel, Stack, Checkbox, useToast, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionHistory from '../components/TransactionHistory';
import AccountSummary from '../components/AccountSummary';

const Profile = () => {
        const [username, setUsername] = useState(null);
        const navigate = useNavigate();
    
        useEffect(() => {
            const checkLoginStatus = async () => {
                try {
                    const response = await fetch('http://localhost:8888/api/users/profile', {
                        method: 'GET',
                        credentials: 'include',
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.username);
                    } else {
                        setUsername(null);
                    }
                } catch (error) {
                    console.error('Error checking login status:', error);
                    setUsername(null);
                }
            };
    
            checkLoginStatus();
        }, []);
    return (
                <Stack direction="column" spacing={5}>
                <Header username={username}/>
                    <Box
                        boxShadow="lg"
                        width="100%"
                        height={'91vh'}
                    >
                     <Center>
                                         <Tabs variant='soft-rounded' colorScheme="red" width={'80%'} height={'100vh'}>
                                             <Center>
                                                 <TabList>
                                                     <Tab>Account Summary</Tab>
                                                     <Tab>Transaction History</Tab>
                                                 </TabList>
                                             </Center>
                                             <TabPanels>
                                                 <TabPanel>
                                                    <AccountSummary />
                                                 </TabPanel>
                                                 <TabPanel>
                                                    <TransactionHistory />
                                                 </TabPanel>
                                             </TabPanels>
                                         </Tabs>
                                     </Center>
                    </Box>
                </Stack>
    );
};

export default Profile;