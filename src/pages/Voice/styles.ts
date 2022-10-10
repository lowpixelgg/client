import styled from "styled-components";

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

  max-width: 748px;
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
      font-weight: 500;
    }

    p {
      font-size: 0.75em;
      color: #767677;
    }
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 32px;
    align-items: flex-start;

    label {
      font-size: 0.625em;
      color: #676767;
      font-weight: 500;
    }
  }

  .col {
    width: 48%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .mic {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    h1 {
      font-size: 0.75em;
      font-weight: 500;
      color: #f8f9fa;
    }

    p {
      max-width: 480px;
      font-size: 0.75em;
      color: #767677;
    }
  }

  & > h1 {
    font-size: 0.875em;
    font-weight: 500;
    margin: 16px 0 -12px;
  }
`;
