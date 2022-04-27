import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Flex, Spacer, Input, Center, Heading, Container, Divider } from '@chakra-ui/react';
import axios from '../axios'
import { motion } from 'framer-motion';

const Produits = () => {

    const [produits, setProduits] = useState([])
    const [search, setSearch] = useState('')
    const [idProduit, setIdProduit] = useState('')
    const [produit, setProduit] = useState([])
    const [listeEmplacement, setListeEmplacement] = useState([])
    const { idBat } = useParams()

    const handleChange = (event) => setSearch(event.target.value);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(`/batiment/${idBat}/${search}`)
            setProduits(req.data)
        }
        fetchData()
    }, [idBat, search])

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(`/produit/getProduit${idProduit}`)
            setProduit(req.data)
        }
        fetchData()
    }, [idProduit])

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(`/stock/${idBat}/${idProduit}`)
            setListeEmplacement(req.data)
        }
        fetchData()
    }, [idProduit])

    return (
        <Container maxW='90%' marginTop={5} flexDirection='column'>
            <Flex flexDirection='row'>
                <Flex flexDirection='column' w='70%'>
                    <Center margin={5}>
                        <Heading>Liste des produits</Heading>
                    </Center>
                    <Center>
                        <Input value={search} onChange={handleChange} placeholder='Rechercher...' size='md' w='80%' h='55px' marginBottom={10} />
                    </Center>
                    {produits.map((unProduit) => {
                        let stock = "Indisponible";
                        if (unProduit.total > 0) {
                            stock = "Disponible";
                        }
                        return (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                            >
                                <Flex onClick={() => setIdProduit(unProduit.pr_reference)} w='100%' h='55px' justifyContent='center' flexDirection='row' border='1px white solid' borderRadius='10px' margin={1}>
                                    <Heading margin={3} size='md'>{unProduit.pr_description}</Heading>
                                    <Spacer />
                                    <Heading margin={3} size='md'>{unProduit.fo_libelle}</Heading>
                                    <Heading margin={3} size='md'>{unProduit.rayon_libelle}</Heading>
                                    <Heading margin={3} size='md'>{stock}</Heading>
                                </Flex>
                            </motion.div>
                        )
                    })}
                </Flex>
                {produit.map((item) => {
                    return (
                        <Flex marginTop={5} marginLeft={10} h='900px' w='25%' border='1px white solid' borderRadius='10px' flexDirection='column'>

                            <Center h='90px' w='100%'>
                                <Heading size='2xl' color='white'>{item.pr_description}</Heading>
                            </Center>
                            <Heading margin={3} size="md">Prix : {item.pr_cout_unitaire_HT} €</Heading>
                            <Heading margin={3} size="md">Identifiant : {item.pr_reference}</Heading>
                            <Heading margin={3} size="md">Fournisseur : {item.fo_libelle}</Heading>
                            <Heading margin={3} size="md">Rayon : {item.rayon_libelle}</Heading>
                            <Divider marginTop={5} />
                            {listeEmplacement.map((unEmplacement) => {
                                return (
                                    <Flex w='90%' h='55px' justifyContent='center' flexDirection='row' border='1px white solid' borderRadius='10px' marginLeft={5} marginTop={5}>
                                        <Heading margin={3} size='md'>{unEmplacement.emplacement}</Heading>
                                        <Spacer />
                                        <Heading margin={3} size='md'>{unEmplacement.quantite}</Heading>
                                    </Flex>
                                )
                            })}
                        </Flex>
                    )
                })}
            </Flex>
        </Container>
    )
}

export default Produits