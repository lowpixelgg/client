import styled from "styled-components";

export const Footer = () => {
  return (
    <Container id="footer">
      <a href="/">Support</a>
      <a href="/">Terms</a>
      <a href="/">Status</a>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  text-decoration: none;
  bottom: 16px;
  left: 20px;

  & a {
    float: left;
    display: block;
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    transition: all ease-in-out 0.3s;
    color: #767677;
    text-align: center;
    padding: 20px 10px;
    text-decoration: none;
  }

  & a:hover {
    color: #cecece;
    transition: all ease-in-out 0.4s;
  }
`;
