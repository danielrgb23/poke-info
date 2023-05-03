import React from 'react'
import { Box, Text, Button, Flex, Image, Input, InputGroup, Stack, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { InputSearch } from '../components/inputSearch'

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
        <InputSearch />
      </Flex>

      <Flex
        w='100%'
        h='96%'>

      </Flex>

    </Flex>
  )
}
