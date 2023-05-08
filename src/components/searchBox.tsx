import { Box, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri'
import { useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../context/Mycontext';

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonSearchProps {
    onSearch: (searchQuery: string) => void;
}

export const PokemonSearch = ({ onSearch }: PokemonSearchProps) => {
    const { setValue } = useMyContext()
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        onSearch(query)

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
            const pokemonData: Pokemon = {
                name: response.data.forms[0].name,
                url: response.data.forms[0].url,
            };
            setSearchResults([pokemonData]);
            setValue([pokemonData]);
        } catch (error) {
            console.log(error);
            setSearchResults([]);
        }
    };

    return (

        <Flex
            as="label"
            flex='1'
            py='3'
            px='5'
            ml='6'
            maxWidth={400}
            alignSelf='center'
            position='relative'
            boxShadow={'base'}
            border={'1px solid #E1E6DD'}
            borderRadius={'3.5em'}
        >

            <Input
                id='input'
                type='text'
                variant='unstyled'
                px='4'
                mr='4'
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder='Pesquisar pokemon'

                fontFamily={'Poppins'}
                fontWeight={'700'}
                fontSize={'15px'}
                opacity={'.5'}
                colorScheme='blackAlpha'
            />

            <Icon as={RiSearchLine} opacity={.5} fontSize='20' />
        </Flex>
    );
};

