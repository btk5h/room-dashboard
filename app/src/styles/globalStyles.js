import { createGlobalStyle } from "styled-components"
import "typeface-roboto"
import "typeface-nunito"

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Roboto, sans-serif;
    margin: 0;
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: Rubik, sans-serif;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`