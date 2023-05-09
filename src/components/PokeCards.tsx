import { Button, Card, CardBody, CardFooter, Flex, FormControl, FormLabel, Heading, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import image from '../assets/background/pokeballCard@2x.png'
import imageModal from '../assets/background/pokeballCard.png'
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
    weight: number,
    abilities: string[],
    location_area_encounters: any,
    moves: string[],
}

export const PokeCards = ({ itens }: any) => {

    const [pokemon, setPokemon] = useState<IPokemonResponse>()
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

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
        // setOpacityValue(0.3) // definir opacidade inicial para o efeito

        axios.get(`${itens.url}`)
            .then(async (res) => {
                // console.log(res)
                const response = await res.data;
                // console.log('res', response)
                const pokemonResponse = {
                    order: response.order,
                    name: response.name,
                    types: response.types,
                    id: response.id,
                    weight: response.weight,
                    abilities: response.abilities,
                    location_area_encounters: (await axios.get(response.location_area_encounters)).data,
                    moves: response.moves,
                }
                setTimeout(() => {
                    setLoading(false)
                    setPokemon(pokemonResponse)
                }, 1000);
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [itens])

    console.log(pokemon)

    return (
        <>

            <Card
                bg={loading ? 'gray.500' : verifyColor()}
                bgImage={image}
                bgRepeat={'no-repeat'}
                bgSize={'15em'}
                bgPosition={'top right'}
            >
                <CardBody>
                    {loading ? <Flex
                        justifyContent={'center'}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='gray.500'
                            size='md'
                        />
                    </Flex>
                        : <Heading
                            display={'flex'}
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
                        </Heading>}
                    {loading ? <Flex
                        mt='3em'
                        justifyContent={'center'}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='gray.500'
                            size='xl'
                        />
                    </Flex>
                        : <Flex
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
                        </Flex>}

                    {loading ? <Flex
                        justifyContent={'center'} mt='3em'>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='gray.500'
                            size='lg'
                        />
                    </Flex>
                        : <Stack mt='6' spacing='3'>
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
                        </Stack>}
                </CardBody>
                <CardFooter>
                    <Flex
                        justifyContent={'right'}
                        w='100%'>
                        <Button
                            onClick={onOpen}
                            w='40%'
                            variant='solid'
                            borderColor={'green'}
                            color={'white'}
                            colorScheme='whatsapp'
                        >
                            More
                        </Button>
                    </Flex>
                </CardFooter>
            </Card>

            <Modal blockScrollOnMount={false} isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color='white' w='100%' bg={verifyColor()}>
                    <ModalHeader color='white' fontWeight={'700'} fontSize={'32px'}>#{pokemon?.id} {pokemon?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDir={'column'}
                    >
                        <Flex
                            p='0px 15px'
                            mt='5px'
                            w='100%'
                            h='70%'
                            bgImage={imageModal}
                            bgRepeat={'no-repeat'}
                            bgSize={'50%'}
                            bgPosition={'bottom right'}
                            justifyContent={'center'}>
                            <Image
                                boxShadow={'base'}
                                borderRadius={'3em'}
                                w='40%'
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                            // borderRadius='lg'
                            />
                        </Flex>
                        <FormControl display={'flex'} flexDir={'row'} gap='10px'>
                            <Stack display='flex' alignItems={'center'} spacing='1'>
                                <FormLabel color='white' fontSize={'22px'}>Tipo</FormLabel>
                                <Flex
                                    flexDir={'column'}
                                    gap='8px'
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
                            </Stack>

                            <Stack display='flex' alignItems={'center'} spacing='1'>
                                <FormLabel color='white' fontSize={'22px'}>Peso</FormLabel>
                                <Flex
                                    // alignItems={'center'}
                                    // justifyContent={'space-around'}
                                    flexDir={'column'}
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
                        </FormControl>
                        <FormControl>
                            <Stack mt='15px' display='flex' alignItems={'start'} spacing='1'>
                                <FormLabel color='white' fontSize={'22px'}>Aonde encontrar?</FormLabel>
                                <Flex
                                    // alignItems={'center'}
                                    // justifyContent={'space-around'}
                                    flexDir={'row'}
                                    gap='8px'
                                    w='100%'>
                                    <Wrap w='100%' spacing='10px'>
                                        {pokemon?.location_area_encounters.map((local: any) => {
                                            return (
                                                <WrapItem w='250px' h='40px'>
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
                                                        {local?.location_area?.name}
                                                    </Text>
                                                </WrapItem>
                                            )
                                        })}
                                    </Wrap>



                                </Flex>
                            </Stack>
                            <Stack mt='15px' display='flex' alignItems={'start'} spacing='1'>
                                <FormLabel color='white' fontSize={'22px'}>Habilidades</FormLabel>
                                <Flex
                                    // alignItems={'center'}
                                    // justifyContent={'space-around'}
                                    // h='500px'
                                    // flexDir={'column'}

                                    w='100%'>
                                    <Wrap w='100%' spacing='8px'>
                                        {pokemon?.moves?.map((moves: any) => {
                                            return (
                                                <WrapItem w='150px' h='20px'>
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
                                                        {moves?.move.name}
                                                    </Text>
                                                </WrapItem>
                                            )

                                        })}
                                    </Wrap>


                                </Flex>
                            </Stack>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' colorScheme='none' color='white'>
                            <Link textDecoration={'none'} target='_blank' href='https://www.linkedin.com/in/daniel-augusto02/'> Meu Linkedin</Link>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}
