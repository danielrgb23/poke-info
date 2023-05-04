import { Flex, Input, Icon } from '@chakra-ui/react'
import axios from 'axios';
import { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useMyContext } from '../context/Mycontext';

interface Pokemon {
    name: string;
    id: number;
    types: string[];
}

export const SearchBox = ({ itens }: any) => {

    const [nomePokemon, setNomePokemon] = useState('')
    const { setValue } = useMyContext();


    function filterPokemons(itens: Pokemon[], query: string | undefined): Pokemon[] {
        return itens.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(query!.toLowerCase())
        );
    }

    useEffect(() => {
        const filteredPokemons = filterPokemons(itens, nomePokemon);
        setValue(filteredPokemons)
    }, [nomePokemon]);

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
                onChange={(e) => setNomePokemon(e.target.value)}
                placeholder='Pesquisar pokemon'

                fontFamily={'Poppins'}
                fontWeight={'700'}
                fontSize={'15px'}
                opacity={'.5'}
                colorScheme='blackAlpha'
            />

            <Icon as={RiSearchLine} opacity={.5} fontSize='20' />
        </Flex>


    )
}