import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./app/App.tsx";

import store from "@store";

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
