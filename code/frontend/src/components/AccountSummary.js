import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Stack, Card, Table, Center} from '@chakra-ui/react';

const AccountSummary = () => {
    const [account,setAccount] = useState({
        name: "John Doe",
        number: "123456789",
        balance: 1000,
        type: "Savings"
    });
    // useEffect(() => {
    //     const fetchAccount = async () => {
    //         try {
    //             const response = await fetch('https://your-backend-api.com/account', {
    //                 method: 'GET',
    //                 credentials: 'include',
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setAccount(data);
    //             } else {
    //                 console.error('Error fetching account:', response.status);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching account:', error);
    //         }
    //     };

    //     fetchAccount();
    // }, []);
    return (
   <Box p={6} boxShadow="lg" borderRadius="lg" bg="white" width="100%">
             <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Account Summary</Text>
             <Center>

             <Card bg={"white"} p={6} allign="center" width={"50%"} >
             {/* <Stack direction="column" spacing={4} align="center" justify="space-between">
                <Text fontSize="xl" fontWeight="bold" textAlign="center">Account Holder: {account.name}</Text>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">Account Number: {account.number}</Text>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">Account Balance: {account.balance}</Text>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">Account Type: {account.type}</Text>
            </Stack> */}
            <Table variant="striped" colorScheme="#D52941">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr> 
                        <td align="center">Account Holder :</td>
                        <td align='left'>{account.name}</td>
                    </tr>
                    <tr>
                        <td align='center'>Account Number :</td>
                        <td align='left'>{account.number}</td>
                    </tr>
                    <tr>
                        <td align='center'>Account Balance :</td>
                        <td align='left'>{account.balance}</td>
                    </tr>
                    <tr>
                        <td align='center'>Account Type :</td>
                        <td align='left'>{account.type}</td>
                    </tr>
                </tbody>
            </Table>

            </Card>
            </Center>
         </Box>
    );
};

export default AccountSummary;