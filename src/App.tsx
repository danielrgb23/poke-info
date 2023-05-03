import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './assets/styles/theme';
import Router from './routes/routes';
import './assets/styles/style.css';

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
