import { useState, useEffect } from 'react'
import { Flex, WrapItem, Wrap } from '@chakra-ui/react'
import axios from 'axios'

import { SearchBox } from '../components/searchBox'
import { PokeCards } from '../components/PokeCards'
import { useMyContext } from '../context/Mycontext'

export const Dashboard = () => {

  const [pokemons, setPokemons] = useState([])
  const [isTop, setIsTop] = useState(true);
  const { value } = useMyContext();

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=100&limit=100")
      .then((res) => {
        setPokemons(res.data.results)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const top = window.scrollY < 40;
      if (top !== isTop) {
        setIsTop(top);
      }
    });
  }, [isTop]);

  if (value?.length != 0) {
    return (
      <Flex
        w='100vw'
        h='100vh'
        flexDir={'column'} >
        <Flex
          position="fixed"
          zIndex="999"
          top='0px'
          bg={isTop ? "white" : "white"}
          transition="background-color 0.2s"
          justifyContent={'center'}
          w='100%'
          h='10%'>
          <SearchBox itens={pokemons} />
        </Flex>

        <Flex
          p='20px 20px'
          w='100%'
          justifyContent={'center'}
          mt='10em'
        >
          <Wrap w='100%' spacing='50px'>
            {
              value?.map((pokemon) => {
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
  } else {
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
          <SearchBox itens={pokemons} />
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
}
