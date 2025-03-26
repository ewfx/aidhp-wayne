import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Center, position } from "@chakra-ui/react";
import { motion } from "framer-motion";
import cardData from "./CardData";
import { Card, CardBody, CardFooter, ButtonGroup, Button, Image, Stack, Heading, Divider } from '@chakra-ui/react';

const MotionBox = motion(Box);

const Carousel = () => {
    const [startIndex, setStartIndex] = useState(0);
    const cardsToShow = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        }, 3000); // Move every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // Get the next 3 cards in a circular way
    const visibleCards = [
        cardData[startIndex % cardData.length],
        cardData[(startIndex + 1) % cardData.length],
        cardData[(startIndex + 2) % cardData.length],
    ];

    return (
        <Flex bg="red" justify="center" align="center" overflow="hidden" width="100%"  height={'60vh'} position={'relative'}> 
            <Flex gap={4} width="full" justify={"center"}>
                {visibleCards.map((card) => (
                    <MotionBox
                        key={card.id}
                        p={6}
                        width="30%" // Each card takes about 1/3rd of the space
                        bg="#FFF8E5"
                        color="white"
                        borderRadius="lg"
                        textAlign="center"
                        boxShadow="lg"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Center>
                                <Card maxW='sm' >
                          <CardBody>
                            {/* <Image
                              src=''
                              alt='Green double couch with wooden legs'
                              borderRadius='lg'
                            /> */}
                            <Stack mt='6' spacing='3'>
                              <Heading size='md'>{card.title}</Heading>
                              <Text>
                                {card.description}
                              </Text>
                              <Text color='blue.600' fontSize='2xl'>
                                $450
                              </Text>
                            </Stack>
                          </CardBody>
                          <Divider />
                          <Center>
                          <CardFooter>
                            <ButtonGroup spacing='2'>
                              <Button variant='solid' colorScheme='red'>
                                Check this out!
                              </Button>
                            </ButtonGroup>
                          </CardFooter>
                          </Center>
                        </Card>
                        </Center>
                    </MotionBox>
                ))}
            </Flex>
        </Flex>
    );
};

export default Carousel;


// import React, { useState, useEffect } from "react";
// import { Box, Text, Flex, Center } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import { Card, CardBody, CardFooter, ButtonGroup, Button, Image, Stack, Heading, Divider } from '@chakra-ui/react';

// const MotionBox = motion(Box);

// const Carousel = () => {
//     const [products, setProducts] = useState([]);
//     const [startIndex, setStartIndex] = useState(0);
//     const cardsToShow = 3;

//     useEffect(() => {
//         fetch("https://api.example.com/products") // Replace with actual API URL
//             .then(response => response.json())
//             .then(data => {
//                 const shuffledData = data.sort(() => Math.random() - 0.5); // Shuffle products
//                 setProducts(shuffledData);
//             })
//             .catch(error => console.error("Error fetching products:", error));
//     }, []);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
//         }, 3000); // Rotate every 3 seconds

//         return () => clearInterval(interval);
//     }, [products]);

//     if (products.length === 0) {
//         return <Center>Loading products...</Center>;
//     }

//     const visibleProducts = [
//         products[startIndex % products.length],
//         products[(startIndex + 1) % products.length],
//         products[(startIndex + 2) % products.length],
//     ];

//     return (
//         <Flex bg="red.100" justify="center" align="center" overflow="hidden" width="100%" height={'60vh'} position={'relative'}>
//             <Flex gap={4} width="full" justify="center">
//                 {visibleProducts.map((product) => (
//                     <MotionBox
//                         key={product.id}
//                         p={6}
//                         width={"30%"}
//                         bg="#FFF8E5"
//                         borderRadius="lg"
//                         textAlign="center"
//                         boxShadow="lg"
//                         initial={{ opacity: 0, x: 100 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         <Center>
//                             <Card maxW='sm'>
//                                 <CardBody>
//                                     <Image
//                                         src={product.imageUrl}
//                                         alt={product.title}
//                                         borderRadius='lg'
//                                     />
//                                     <Stack mt='6' spacing='3'>
//                                         <Heading size='md'>{product.title}</Heading>
//                                         <Text>{product.description}</Text>
//                                         <Text color='blue.600' fontSize='2xl'>
//                                             ${product.price}
//                                         </Text>
//                                     </Stack>
//                                 </CardBody>
//                                 <Divider />
//                                 <Center>
//                                     <CardFooter>
//                                         <ButtonGroup spacing='2'>
//                                             <Button variant='solid' colorScheme='red'>
//                                                 Check this out!
//                                             </Button>
//                                         </ButtonGroup>
//                                     </CardFooter>
//                                 </Center>
//                             </Card>
//                         </Center>
//                     </MotionBox>
//                 ))}
//             </Flex>
//         </Flex>
//     );
// };

// export default Carousel;
