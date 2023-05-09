import { Box, Button, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PokeCards } from '../PokeCards';
import { useMyContext } from '../../context/Mycontext';
import { PokemonSearch } from '../searchBox';
// import PokemonSearch from './PokemonSearch'; // Importe o componente PokemonSearch

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export const Pagination = () => {
    const [pokemonData, setPokemonData] = useState<PokemonResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { value, setValue } = useMyContext();
    const [searchQuery, setSearchQuery] = useState('');


    const fetchPokemons = async (url: string) => {
        try {
            if (value && value[0].url === url) {
                setPokemonData({
                    count: 1,
                    next: null,
                    previous: null,
                    results: [value[0]]
                });
            } else {
                const response = await axios.get<PokemonResponse>(url);
                setPokemonData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        if (value) {
            fetchPokemons(value[0].url);
        } else {
            fetchPokemons(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`);
        }
    }, [currentPage, value, searchQuery]);

    useEffect(() => {
        // @ts-ignore ou // @ts-expect-error 
        setValue(null);
    }, [searchQuery]);

    const goToPreviousPage = () => {
        if (pokemonData?.previous) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const goToNextPage = () => {
        if (pokemonData?.next) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <Box display={'flex'} justifyContent={'center'} flexDir={'column'} gap='3em'>
            <PokemonSearch onSearch={handleSearch} />
            <Box>
                {pokemonData && (
                    <Flex justifyContent="center" alignItems="center">
                        <Button
                            onClick={goToPreviousPage}
                            disabled={!pokemonData.previous}
                            mr={2}
                        >
                            Previous
                        </Button>
                        <Text>{`Page ${currentPage} of ${Math.ceil(pokemonData.count / 20)}`}</Text>
                        <Button onClick={goToNextPage} disabled={!pokemonData.next} ml={2}>
                            Next
                        </Button>
                    </Flex>
                )}

                {pokemonData && (
                    <Box mt={4}>
                        <Wrap w='100%' spacing='50px'>
                            {
                                pokemonData?.results?.map((pokemon) => {
                                    return (
                                        <WrapItem w='250px' h='420px'>
                                            <PokeCards
                                                itens={pokemon}
                                            />
                                        </WrapItem>
                                    )
                                })
                            }
                        </Wrap>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
