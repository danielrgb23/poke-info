import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './assets/styles/theme';
import Router from './routes/routes';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Router />
      </div>
    </ChakraProvider>
  )
}

export default App
