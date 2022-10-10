import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 56px;
  border: 4px solid #212529;
  border-radius: 50%;
  position: relative;

  span {
    width: 18px;
    aspect-ratio: 1;
    position: absolute;
    bottom: -2px;
    right: -2px;
    border-radius: 50%;
    border: 4px solid #212529;
  }

  img {
    width: 100%;
    aspect-ratio: 1;
  }
`;
