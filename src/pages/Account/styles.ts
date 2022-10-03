import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 32px;
  font-family: "Inter", sans-serif;
  color: #f8f9fa;

  max-width: 748px;
  margin: 0 auto;

  .head {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    h1 {
      font-size: 1.125em;
    }

    p {
      font-size: 0.75em;
      color: #767677;
    }
  }

  .userContainer {
    width: 100%;
    background: #141414;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    display: flex;
    flex-direction: column;

    .userContainer--banner {
      width: 100%;
      min-height: 64px;
      background: #c4c4c4;
      aspect-ratio: 8;
    }

    .userContainer--head {
      width: 100%;
      padding: 0 16px 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .avatar {
        margin-top: -15%;
        width: 72px;
      }

      .name {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        margin: 12px 0;

        h3 {
          font-weight: 600;
          font-size: 1.125em;
        }

        span {
          max-width: 180px;
          display: flex;
          align-items: center;
          gap: 2px;
          overflow-x: auto;
        }

        svg {
          flex-shrink: 0;
        }
      }

      & > button {
        display: flex;
        background: #5865f2;
        color: #f8f9fa;
        font-weight: 500;
        padding: 8px 16px;
        font-size: 0.75em;
        border-radius: 4px;
      }
    }

    .userContainer--infos {
      width: 100%;
      margin-top: 16px;
      padding: 0 16px 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > button {
          padding: 8px 16px;
          background: #282828;
          color: #f8f9fa;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 4px;
        }
      }

      .left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;

        h3 {
          font-size: 0.75em;
          font-weight: 500;
          color: #676767;
        }

        p {
          font-size: 0.75em;
          color: #d2d2d2;
        }
      }
    }
  }

  .auth {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    & > div {
      display: flex;
      align-items: center;
      gap: 8px;

      button:first-child {
        padding: 8px 16px;
        background: #5865f2;
        color: #f8f9fa;
        display: flex;
        align-items: center;
        font-size: 0.75em;
        border-radius: 2px;
        gap: 8px;
      }

      button:nth-child(2) {
        color: #676767;
        font-size: 0.75em;
        font-weight: 500;
      }
    }

    h1 {
      font-size: 1.125em;
    }

    p {
      font-size: 0.625em;
      color: #767677;
    }
  }

  @media screen and (max-height: 600px) {
    justify-content: flex-start;
    overflow-y: auto;
    padding: 16px 0;
  }
`;
