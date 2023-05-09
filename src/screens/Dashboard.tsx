import { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'

import { Pagination } from '../components/Pagination/Pagination'

export const Dashboard = () => {

  const [isTop, setIsTop] = useState(true);

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

