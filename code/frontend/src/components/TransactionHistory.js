import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box, Text } from "@chakra-ui/react";
import axios from "axios";
const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const username = "IND001";

    useEffect(() => {
        const fetchTransactions = async () => {
            // const token = localStorage.getItem('token');
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTQwYmM1OWJjNDA2ZjRjY2EwYTE5MSIsInVzZXJuYW1lIjoiSU5EMDAxIiwiaWF0IjoxNzQzMDAxODkyLCJleHAiOjE3NDMwMDU0OTJ9.eilWgVPGO0Coxdw7poI4HB7mX5ZUtu9Cif5arLrlYcs";
            try {
                const response = await axios.get('http://localhost:8888/api/transactions/IND001', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
        console.log(transactions);
    }, []);

    return (
        <Box p={6} boxShadow="lg" borderRadius="lg" bg="white">
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Transaction History</Text>
                <TableContainer>
                    <Table variant="striped" colorScheme="#D52941"></Table>
                    <Table variant="striped" colorScheme="#D52941">
                        <Thead>
                            <Tr>
                                <Th>Product Id</Th>
                                <Th>Transaction Type</Th>
                                <Th>Category</Th>
                                <Th>Amount</Th>
                                <Th>Purchase Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <Tr>
                                        <Td>{transaction.productId}</Td>
                                        <Td>{transaction.transactionType}</Td>
                                        <Td>{transaction.category}</Td>
                                        <Td>{transaction.amount}</Td>
                                        <Td>{transaction.purchaseDate}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr bg={'red.400'}>
                                    <Td colSpan={6} textAlign="center" >No transactions found</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
        </Box>
    );
};

export default TransactionHistory;