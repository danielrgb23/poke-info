import { Flex, Input, Icon } from '@chakra-ui/react'
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";


export const InputSearch = () => {

    const searchInputRef = useRef<HTMLInputElement>(null)

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
                type='text'
                variant='unstyled'
                px='4'
                mr='4'
                ref={searchInputRef}
                placeholder='Pesquisar pokemon'

                fontFamily={'Lato'}
                fontWeight={'700'}
                fontSize={'17px'}
                opacity={'.5'}
                colorScheme='blackAlpha'
            />

            <Icon as={RiSearchLine} opacity={.5} fontSize='20' />
        </Flex>


    )
}