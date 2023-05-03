import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  position: relative;

  #footer {
    z-index: 2;
  }

  #footer a {
    font-size: 12px;
  }

  .sideNav {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 2;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #72767d;
    font-size: 0.625em;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 2;

    p {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;
