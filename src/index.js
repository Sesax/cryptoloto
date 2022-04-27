import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './style/theme';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);