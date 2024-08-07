import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById("root")!).render(
 // <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </ChakraProvider>
  //</React.StrictMode>
);
