import React from 'react';
import './App.css';
import BlendModeDemo from './BlendModeDemo/BlendModeDemo';
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"// import SimpleDemo from './SimpleDemo';

export function App() {
  return <>
    <ChakraProvider theme={theme}>
      <Box textAlign="center">
        <BlendModeDemo />
      </Box>
    </ChakraProvider>
  </>

}




export default App;

