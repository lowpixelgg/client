import styled from "styled-components";

export const Container = styled.div` 
  width: fit-content;
  min-width: 160px;

  * {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
  }

  .box {
    width: 100%;

    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border: 1px solid #616161;
    transition: all ease-in-out .4s;
    position: relative;

    &.active {
      border: 1px solid #6E42E5;
      transition: all ease-in-out .4s;
    }

    &.icon {
      input {
        padding-left: 32px;
      }
      &.active svg {
        color: #6E42E5;
      }
      svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 8px;
        color: #616161;
        transition: 0.2s ease-in-out;
      }
    }
  }


  input {  
      height: 100%;
      padding: 8px 16px;
      flex-grow: 1;
      font-size: 1em;
      background: none;
      outline: none;
      color: #D2D2D2;



      &::placeholder {
          color: #505059;
          font-weight: 400;
          font-size: 14px;

      }
  }
`;