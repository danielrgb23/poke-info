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
    const { value } = useMyContext();
    const [searchQuery, setSearchQuery] = useState(''); // Adicione um estado para o valor da pesquisa

    // console.log(value)

    const fetchPokemons = async (url: string) => {
        try {
            const response = await axios.get<PokemonResponse>(url);
            setPokemonData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(searchQuery)

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // setPokemonData(searchQuery[0]?.name)
    };

    useEffect(() => {
        fetchPokemons(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`);
    }, [currentPage]);

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

    // Restante do código
    return (
        <Box>
            <PokemonSearch onSearch={handleSearch} /> {/* Adicione o componente PokemonSearch e passe a função handleSearch */}
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
                                pokemonData.results.map((pokemon) => {
                                    return (
                                        <WrapItem w='250px' h='420px'>
                                            <PokeCards
                                                itens={pokemon}
                                                searchValue={value}
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
