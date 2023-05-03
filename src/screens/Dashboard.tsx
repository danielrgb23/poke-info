import React from 'react'
import { Box, Text, Button, Flex, Image, Input, InputGroup, Stack, InputLeftElement, InputRightElement, WrapItem, Wrap } from '@chakra-ui/react'
import { SearchBox } from '../components/searchBox'
import { PokeCards } from '../components/PokeCards'

export const Dashboard = () => {
  return (
    <Flex
      w='100vw'
      h='100vh'
      flexDir={'column'} >
      <Flex
        justifyContent={'center'}
        w='100%'
        h='4%'
        m='10px 0px'>
        <SearchBox />
      </Flex>

      <Flex
        p='20px 20px'
        w='100%'
      >
        <Wrap w='100%'  spacing='20px'>
          <WrapItem w='250px' h='410px' >
            <PokeCards/>
          </WrapItem>
          <WrapItem w='250px'>
            <PokeCards />
          </WrapItem>
          <WrapItem w='250px'>
            <PokeCards />
          </WrapItem>
        </Wrap>
      </Flex>

    </Flex>
  )
}
