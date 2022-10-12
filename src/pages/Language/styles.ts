import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  font-family: "Inter", sans-serif;
  color: #f8f9fa;

  max-width: 600px;
  margin: 0 auto;

  @media screen and (max-height: 600px) {
    overflow-y: auto;
  }

  @media screen and (max-width: 840px) {
    padding-top: 48px;
  }

  .head {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    h1 {
      font-size: 1em;
    }

    p {
      max-width: 480px;
      font-size: 0.75em;
      color: #767677;
    }
  }

  .row {
    margin: 0 auto;
    max-width: 480px;
    width: 90%;

    .languageItem {
      strong::after {
        content: ",";
      }

      p {
        font-size: 0.875em;
      }

      div {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }

  .changeAction {
    margin-top: auto;
    align-self: flex-end;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.875em;
    color: #f8f9fa;
    background: #5865f2;
  }
`;

export const CustomMuiStyles = createGlobalStyle`
  .MuiPaper-root {
    background: #2F3136 !important;
    margin-top: 16px;
  }

  li.Mui-selected {
    background: #292B2F !important;
  }

  ul.MuiMenu-list {
    padding: 0;

    & > li {
      margin: 0;
      padding: 8px;
      border-radius: 0;
    }
  }

  .languageItem {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    font-family: "Inter", sans-serif;

    strong {
      font-size: 0.875em;
      font-weight: 500;
    }

    p {
      font-size: 0.75em;
    }

    img {
      object-fit: contain;
      flex-shrink: 0;
      width: 32px;
    }
  }
`;
