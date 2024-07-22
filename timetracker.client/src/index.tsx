import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

const customTheme = extendTheme({
    fonts: {
        heading: "'Rubik', sans-serif",
        body: "'Rubik', sans-serif",
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={customTheme}>
            <App/>
        </ChakraProvider>
    </React.StrictMode>,
)
