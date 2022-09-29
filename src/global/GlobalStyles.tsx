import { createGlobalStyle } from "styled-components";

import background from "../assets/images/background_login.png";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    user-select: none;
    -webkit-user-drag: none;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  body {
    transition: background-image 1s ease;
    background-image: url(${background});
    background-size: cover;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .font--Inter {
    font-family: 'Inter', sans-serif;
  }

  .font-Poppins {
    font-family: 'Poppins', sans-serif;
  }

  .font--Roboto {
    font-family: 'Roboto', sans-serif;
  }
`;
