import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  font-family: "Inter", sans-serif;
  color: #f8f9fa;

  max-width: 748px;
  margin: 0 auto;

  @media screen and (max-height: 600px) {
    padding: 16px 0;
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
    margin-bottom: 24px;

    h1 {
      font-size: 1em;
      font-weight: 500;
    }

    p {
      max-width: 480px;
      font-size: 0.75em;
      color: #767677;
    }
  }

  .ram {
    width: 100%;
    display: flex;
    gap: 16px;
    align-items: center;

    label {
      font-size: 0.75em;
      color: #676767;
      font-weight: 500;
      white-space: nowrap;
    }

    p {
      font-family: "Poppins", sans-serif;
      font-size: 0.875em;
      font-weight: 500;
    }

    .sliders {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;

      .row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }

    .values {
      padding: 24px 0 8px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .directions {
      margin-top: 12px;
    }

    .var {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;

      p {
        font-size: 1.125em;
      }
    }
  }

  .tip {
    max-width: 480px;
    font-family: "Roboto", sans-serif;
    font-size: 0.75em;
    color: #767677;
    margin-bottom: 24px;
  }

  .install {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h1 {
      font-size: 0.875em;
      font-weight: 500;
      margin-bottom: -4px;
    }

    p {
      max-width: 560px;
      font-size: 0.75em;
      color: #767677;
    }

    & > div {
      max-width: 640px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button {
      width: auto;
      height: 100%;
      padding: 8px 16px;
      background: #5865f2;
      color: #f8f9fa;
      flex-shrink: 0;
      font-family: "Inter", sans-serif;
      font-weight: 500;
      font-size: 0.75em;
      border-radius: 4px;
    }
  }

  .comp {
    margin-top: 16px;
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 0.75em;
      color: #676767;
      font-weight: 500;
      white-space: nowrap;
    }
  }
`;
