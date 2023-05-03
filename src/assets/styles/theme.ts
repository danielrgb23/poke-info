import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
}

export const theme = extendTheme({
    breakpoints,
    // colors: {
    //     gray: {
    //         '900': '#222021',
    //         '800': '#DADADA',
    //         '700': '#E1E6DD',
    //         '600': '#EFF0E7',
    //         '500': '#FAFAF8',
    //     },
    //     green: {
    //         '900': '#1C4532',
    //         '500': '#38A169',
    //         '50': '#F0FFF4'
    //     }
    // },
    // fonts: {
    //     heading: 'Inter',
    //     body: 'Inter'
    // },
    // styles: {
    //     global: {
    //         body: {
    //             bg: 'gray.500',
    //             color: 'gray.900'
    //         }
    //     }
    // }
})