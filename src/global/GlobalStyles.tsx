import { createGlobalStyle } from "styled-components";

import background from "../assets/images/background_login.png"

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    
  }


  body {
    transition: background-image 1s ease;
    background-image: url(${background});
    background-size: cover;
    overflow: hidden;
  }

`