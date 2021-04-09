
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react"
import React from 'react';
import { AuthProvider } from "./context";

import Site from './components/Site';
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })
const queryClient = new QueryClient()

function App() {
  
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Site />
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
