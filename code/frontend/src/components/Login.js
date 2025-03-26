import React, { useState } from 'react';
import { Box, Center, Input, InputGroup, Button, InputRightElement, Tabs, TabList, TabPanels, Tab, TabPanel, Stack, Checkbox, useToast, Radio, RadioGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserInterestDropdown from './UserLogin/UserDropDowns/UserInterestDropdown';
import OrgPreferencesDropdown from './OrgDropDowns/OrgPreferencesDropdown';
import OrgFinancialNeessDropdown from './OrgDropDowns/OrgFinancialNeedsDropdown';
import AgeInput from './UserLogin/UserAge';

const Login = () => {
    const [show, setShow] = useState(false);
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [userType, setUserType] = useState('individual');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleClick = () => setShow(!show);
    
    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/home"); // Navigate to home page on login click
    };


    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     if (!loginUsername || !loginPassword) {
    //         toast({
    //             title: 'Validation Error',
    //             description: 'Please fill in both fields.',
    //             status: 'error',
    //             duration: 4000,
    //             isClosable: true,
    //             position: 'top',
    //         });
    //         return;
    //     }

    //     setIsLoading(true);

    //     const apiUrl = 'http://localhost:8888/api/users/login';

    //     try {
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username: loginUsername, password: loginPassword }),
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             toast({
    //                 title: 'Login successful',
    //                 description: 'You have logged in successfully.',
    //                 status: 'success',
    //                 duration: 4000,
    //                 isClosable: true,
    //                 position: 'top'
    //             });
    //             navigate("/"); // Navigate to home page after successful login
    //         } else {
    //             toast({
    //                 title: 'Login failed',
    //                 description: data.message || 'Invalid credentials.',
    //                 status: 'error',
    //                 duration: 4000,
    //                 isClosable: true,
    //                 position: 'top',
    //             });
    //         }
    //     } catch (error) {
    //         toast({
    //             title: 'Error',
    //             description: 'Something went wrong. Please try again later.',
    //             status: 'error',
    //             duration: 4000,
    //             isClosable: true,
    //             position: 'top',
    //         });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!signupUsername || !signupPassword) {
            toast({
                title: 'Validation Error',
                description: 'Please fill in both fields.',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        setIsLoading(true);

        const apiUrl = 'http://localhost:8888/api/users/register';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: signupUsername, password: signupPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Signup successful',
                    description: 'You have signed up successfully.',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
            } else {
                toast({
                    title: 'Signup failed',
                    description: data.message || 'Something went wrong.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again later.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box bg={"#FFF8E8"} minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Box
                direction="column"
                bg="white"
                p={12}
                rounded={12}
                boxShadow="lg"
                width="100%"
                maxWidth="400px"
            >
                <Center>
                    <Tabs variant='soft-rounded' colorScheme="red">
                        <Center>
                            <TabList>
                                <Tab>Sign up</Tab>
                                <Tab>Login</Tab>
                            </TabList>
                        </Center>
                        <TabPanels>
                            <TabPanel>
                                <Center>
                                    <Stack spacing={4}>
                                        <Input
                                            placeholder='Enter username'
                                            value={signupUsername}
                                            onChange={(e) => setSignupUsername(e.target.value)}
                                        />
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                value={signupPassword}
                                                onChange={(e) => setSignupPassword(e.target.value)}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Center>
                                            <RadioGroup value={userType} onChange={setUserType}>
                                                <Stack direction="row" spacing={4}>
                                                    <Radio value="individual">Individual</Radio>
                                                    <Radio value="organization">Organization</Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </Center>
                                        {userType === 'organization' ? (
                                            <>
                                            <Stack spacing={4}>
                                                <Input
                                                    placeholder='Enter organization name'
                                                />
                                                <OrgPreferencesDropdown/>
                                                <OrgFinancialNeessDropdown/>
                                                
                                            </Stack>
                                            </>
                                        ) : (
                                            <>
                                            <Stack spacing={4}>
                                                <Input
                                                    placeholder='Username'
                                                />
                                                <AgeInput/>
                                                <UserInterestDropdown/>

                                                

                                            </Stack>
                                            </>
                                        )}
                                        <Center>
                                            <Checkbox size='md' colorScheme='green' isInvalid>Accept terms and conditions</Checkbox>
                                        </Center>
                                        <Center>
                                            <Button colorScheme='blue' onClick={handleSignup} isLoading={isLoading}>
                                                Sign up
                                            </Button>
                                        </Center>
                                    </Stack>
                                </Center>
                            </TabPanel>
                            <TabPanel>
                                <Center>
                                    <Stack spacing={4}>
                                        <Input
                                            pr='4.5rem'
                                            placeholder='Enter username'
                                            value={loginUsername}
                                            onChange={(e) => setLoginUsername(e.target.value)}
                                        />
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Center>
                                            <Button colorScheme='blue' onClick={handleLogin} isLoading={isLoading}>
                                                Log in
                                            </Button>
                                        </Center>
                                    </Stack>
                                </Center>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Center>
            </Box>
        </Box>
    );
};

export default Login;