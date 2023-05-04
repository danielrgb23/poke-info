import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './assets/styles/theme';
import Router from './routes/routes';
import './assets/styles/style.css';
import { MyContextProvider } from './context/Mycontext';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <MyContextProvider>
        <div className="App">
          <Router />
        </div>
      </MyContextProvider>
    </ChakraProvider>
  )
}

export default App
