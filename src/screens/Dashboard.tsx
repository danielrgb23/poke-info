import { useState, useEffect } from 'react'
import { Box, Text, Button, Flex, Image, Input, InputGroup, Stack, InputLeftElement, InputRightElement, WrapItem, Wrap } from '@chakra-ui/react'
import axios from 'axios'

import { SearchBox } from '../components/searchBox'
import { PokeCards } from '../components/PokeCards'

export const Dashboard = () => {

  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setPokemons(res.data.results)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  // console.log(pokemons)

  return (
    <Flex
      w='100vw'
      h='100vh'
      flexDir={'column'} >
      <Flex
        justifyContent={'center'}
        w='100%'
        h='4%'
        m='3em 0px'>
        <SearchBox />
      </Flex>

      <Flex
        p='20px 20px'
        w='100%'
        justifyContent={'center'}
      >
        <Wrap w='100%' spacing='50px'>
          {
            pokemons.map((pokemon) => {
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
      </Flex>

    </Flex>
  )
}
