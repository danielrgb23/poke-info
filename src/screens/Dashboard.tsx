import { useState, useEffect } from 'react'
import { Flex, WrapItem, Wrap } from '@chakra-ui/react'
import axios from 'axios'

import { PokemonSearch } from '../components/searchBox'
import { PokeCards } from '../components/PokeCards'
import { useMyContext } from '../context/Mycontext'
import { Pagination } from '../components/Pagination/Pagination'

export const Dashboard = () => {

  const [pokemons, setPokemons] = useState([])
  const [isTop, setIsTop] = useState(true);


  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/")
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


  return (
    <Flex
      w='100vw'
      h='100vh'
      flexDir={'column'} >
      {/* <Flex
        justifyContent={'center'}
        w='100%'
        h='4%'
        m='3em 0px'>
        <PokemonSearch />
      </Flex> */}

      <Flex
        p='20px 20px'
        w='100%'
        justifyContent={'center'}
      >

      </Flex>
      <Pagination />
    </Flex>
  )
}

