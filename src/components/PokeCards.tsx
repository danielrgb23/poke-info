import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import image from '../assets/background/pokeballCard.png'

export const PokeCards = () => {

    const typeColors = {
        "grass": "#78C850",
        "fire": "#F08030",
        "water": "#6890F0",
        "bug": "#A8B820",
        "flying": "#A890F0",
        "posion": " #A040A0",
        "phantom": "#705898",
        "normal": "#A8A878"
    }

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
                    >#3</Text>
                    <Text
                        fontFamily={'Poppins'}
                        fontWeight={'700'}
                        fontSize={'20px'}
                        colorScheme='blackAlpha'
                    > &nbsp;Ivysaur</Text>
                </Heading>
                <Flex
                    bg='#78C850'
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
                        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png'
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
                        <Text
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
                            Grass
                        </Text>
                        <Text
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
                            Poison
                        </Text>
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
                            40Kg
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