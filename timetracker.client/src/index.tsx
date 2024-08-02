import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {Provider} from "react-redux";
import store from "./store.ts";

const customTheme = extendTheme({
    fonts: {
        heading: "'Rubik', sans-serif",
        body: "'Rubik', sans-serif",
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider theme={customTheme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ChakraProvider>
);
