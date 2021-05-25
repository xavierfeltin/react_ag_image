import { ChakraProvider } from "@chakra-ui/react"
import { render } from "react-dom";
import MyApp from "./MyApp"

const rootElement = document.getElementById("root");
render(
  <ChakraProvider>
    <MyApp />
  </ChakraProvider>,
  rootElement
);