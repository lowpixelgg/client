import styled from "styled-components";

type ContainerProps = {
  size?: number;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: ${({ size }) => (size ? size : 56)}px;
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
