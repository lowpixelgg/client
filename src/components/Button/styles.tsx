import styled from "styled-components";

export const Container = styled.div` 
    width: 100%;
    min-width: 160px;
    
    .box {
        height: 37px;
        background: #572AC8;
        border-radius: 3px;
        opacity: 0.5;
        transition: all ease-in-out .4s;
        
        &.active {
            opacity: 1;
            transition: all ease-in-out .4s;
        }
    }

    button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        background: none;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 1em;
        color: white;
    }
`;