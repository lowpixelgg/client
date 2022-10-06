import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  color: #f8f9fa;

  .menu {
    background: #212529;
    padding: 8px;
    border-radius: 50%;
    position: fixed;
    top: 32px;
    left: 8px;
    display: none;
  }

  nav {
    flex-shrink: 0;
    height: 80%;
    max-height: 480px;
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    font-family: "Inter", sans-serif;
    font-size: 0.75em;
    color: #adb5bd;

    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: 0.2s ease;

      &:hover {
        color: #dee2e6;
      }
      &.active {
        color: #f8f9fa;
      }
    }

    h1 {
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 1.5em;
      margin-bottom: 32px;
      color: #f8f9fa;
    }

    hr {
      width: 100%;
      height: 2px;
      background: #262729;
    }
  }

  & > div {
    animation: pageFade 0.4s ease-in;
  }

  @keyframes pageFade {
    from {
      opacity: 0;
      filter: blur(1px);
    }
    to {
      opacity: 1;
      filter: blur(0);
    }
  }

  @media screen and (max-width: 840px) {
    .menu {
      display: flex;
    }
    nav {
      display: none;
      position: fixed;
      top: 80px;
      left: 16px;
      height: 100%;
      background: #212529;
      padding: 16px;
      height: auto;
      z-index: 2;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

      &.active {
        display: flex;
      }
    }
  }
`;

export const CustomMuiStyles = createGlobalStyle`
  .MuiPaper-root {
    background: #131316 !important;
  }

  ul.MuiMenu-list {
    padding: 8px;

    & > li {
      margin: 4px 0;
      padding: 4px 6px;
      border-radius: 4px;
    }
  }

  li.Mui-selected {
    background: #2F3037 !important;
  }

  .MuiSlider-thumb {
    box-shadow: none !important;
  }
`;
