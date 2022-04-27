import React, { useEffect, useState } from "react";
import { Container, Flex, Box, Center, Heading } from '@chakra-ui/react';
import axios from '../axios';
import UnBatiment from '../assets/batiment.jpg';
import { motion } from 'framer-motion';

const Home = () => {

    const [batiment, setBatiment] = useState([])

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/batiment')
            setBatiment(req.data)
        }
        fetchData()
    }, [])

    return (
        <Container maxW='100%' h='970px' marginTop={0} padding={0}>
            <Flex justify='center' w='100%' h='100%'>
                {
                    batiment.map((bat) => {
                        return (
                            <Box h='100%' flex='1'>
                                <a href={`/batiment/${bat.ba_id}`}>
                                    <Box h='100%' w='100%' backgroundImage={UnBatiment}>
                                        <motion.div
                                            whileHover={{ backgroundColor: 'rgba(0, 0, 0, .4)' }}
                                        >
                                            <Center h='970px' w='100%'>
                                                <Heading size='lg'>{bat.ba_adresse}</Heading>
                                            </Center>
                                        </motion.div>
                                    </Box>
                                </a>
                            </Box>
                        )

                    })
                }
            </Flex>
        </Container >
    );
}

export default Home;