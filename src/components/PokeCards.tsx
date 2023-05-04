import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import image from '../assets/background/pokeballCard@2x.png'
import axios from 'axios'

interface ItypesPokemon {
    name: string
    url: string
}

interface ItypePokemon {
    type: ItypesPokemon
}

interface IPokemonResponse {
    order: number,
    name: string,
    types: ItypePokemon[],
    id: number,
    weight: number
}

export const PokeCards = ({ itens }: any) => {

    const [pokemon, setPokemon] = useState<IPokemonResponse>()
    const [loading, setLoading] = useState(false)
    const [opacityValue, setOpacityValue] = useState(0)

    const typeColors: any = {
        'normal': '#A8A77A',
        'fire': '#EE8130',
        'water': '#6390F0',
        'electric': '#F7D02C',
        'grass': '#7AC74C',
        'ice': '#96D9D6',
        'fighting': '#C22E28',
        'poison': '#A33EA1',
        'ground': '#E2BF65',
        'flying': '#A98FF3',
        'psychic': '#F95587',
        'bug': '#A6B91A',
        'rock': '#B6A136',
        'ghost': '#735797',
        'dragon': '#6F35FC',
        'dark': '#705746',
        'steel': '#B7B7CE',
        'fairy': '#D685AD',
    }

    const verifyColor = () => {
        const types = pokemon!?.types.length > 0 ? pokemon?.types[0].type.name : null
        return typeColors[types || "normal"];
    }


    useEffect(() => {
        setLoading(true)
        setOpacityValue(0.3) // definir opacidade inicial para o efeito

        axios.get(`${itens.url}`)
            .then(async (res) => {
                // console.log(res)
                const response = await res.data;
                const pokemonResponse = {
                    order: response.order,
                    name: response.name,
                    types: response.types,
                    id: response.id,
                    weight: response.weight
                }
                setLoading(false)
                setPokemon(pokemonResponse)
            }).catch((err) => {
                setLoading(false)
            })
    }, [itens])

    return (
        <Card
            bg={verifyColor()}
            bgImage={image}
            bgRepeat={'no-repeat'}
            bgSize={'15em'}
            bgPosition={'top right'}
        >
            <CardBody>
                <Heading
                    display={'flex'}
                    // size='md' 
                    p='0px 10px'
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Text
                        fontFamily={'Poppins'}
                        fontWeight={'500'}
                        fontSize={'17px'}
                        // opacity={'.5'}
                        colorScheme='blackAlpha'
                    >#{pokemon?.order}</Text>
                    <Text
                        fontFamily={'Poppins'}
                        fontWeight={'700'}
                        fontSize={'20px'}
                        colorScheme='blackAlpha'
                    > &nbsp;{pokemon?.name}</Text>
                </Heading>
                <Flex
                    boxShadow={'base'}
                    borderRadius={'3em'}
                    p='0px 15px'
                    mt='5px'
                    w='100%'
                    h='60%'
                    justifyContent={'center'}>
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                </Flex>

                <Stack mt='6' spacing='3'>
                    <Flex
                        alignItems={'center'}
                        justifyContent={'space-around'}
                        flexDir={'row'}
                        // gap='8px'
                        w='100%'>
                        {
                            pokemon?.types?.map(({ type, index }: any) => (
                                <Text
                                    key={index}
                                    display={'flex'}
                                    borderRadius={'10px'}
                                    // w='100%'
                                    p='0px 10px'
                                    bg='green'
                                    alignItems={'center'}
                                    justifyContent={'center'}

                                    color={'white'}
                                    fontFamily={'Poppins'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}>
                                    {type.name}
                                </Text>
                            ))
                        }
                    </Flex>
                    <Flex
                        alignItems={'center'}
                        justifyContent={'space-around'}
                        flexDir={'row'}
                        // gap='8px'
                        w='100%'>
                        <Text
                            display={'flex'}
                            borderRadius={'10px'}
                            // w='100%'
                            p='0px 10px'
                            bg='green'
                            alignItems={'center'}
                            justifyContent={'center'}

                            color={'white'}
                            fontFamily={'Poppins'}
                            fontWeight={'400'}
                            fontSize={'14px'}>
                            {pokemon?.weight}Kg
                        </Text>
                    </Flex>
                </Stack>
            </CardBody>
            <CardFooter>
                <Flex
                    justifyContent={'right'}
                    w='100%'>
                    <Button
                        w='40%'
                        variant='solid'
                        borderColor={'green'}
                        color={'white'}
                        colorScheme='whatsapp'
                    >
                        Mais
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    )
}