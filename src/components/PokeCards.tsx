import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import image from '../assets/background/pokeballCard.png'
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
        "grass": "#78C850",
        "fire": "#F08030",
        "water": "#6890F0",
        "bug": "#A8B820",
        "flying": "#A890F0",
        "posion": " #A040A0",
        "phantom": "#705898",
        "normal": "#A8A878"
    }

    const verifyColor = () => {
        const types = pokemon!?.types.length > 0 ? pokemon?.types[0].type.name : null
        return typeColors[types || "normal"];
    }

    // console.log('euu',pokemon)

    useEffect(() => {
        setLoading(true)
        setOpacityValue(0.3) // definir opacidade inicial para o efeito

        axios.get(`${itens.url}`)
            .then((res) => {
                console.log(res)
                const response = res.data;
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
    }, [])

    useEffect(() => {
        if (loading) {
            // definir a animação de opacidade enquanto carrega
            const interval = setInterval(() => {
                setOpacityValue((prev) => prev === 0.25 ? 0.3 : 0.25)
            }, 500)
            return () => clearInterval(interval)
        }
    }, [loading])

    return (
        <Card>
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
                    bg={verifyColor()}
                    boxShadow={'base'}
                    borderRadius={'3em'}
                    p='0px 15px'
                    mt='5px'
                    w='100%'
                    h='60%'
                    bgImage={image}
                    bgRepeat={'no-repeat'}
                    bgSize={'10em'}
                    bgPosition={'top right'}
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
                                    bg='#78C850'
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
                        variant='outline'
                        colorScheme='green'>
                        Mais
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    )
}