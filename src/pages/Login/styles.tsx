import styled from "styled-components";
import logo from "../../assets/logos/dreams.png";
import union from "../../assets/Union.png"
import rectangle from "../../assets/rectangle.png"
import rectangleImg from "../../assets/rectangle_img.png"

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.274) 100%
  );
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-around;

  #logo {
    position: absolute;
    width: 196px;
    height: 38px;
    left: 34px;
    top: 90px;
    background-size: cover;
    background-image: url(${logo});
  }

  @keyframes floating {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }

  #right-content {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 64px;
    /* left: 542.32px;
    top: 289.41px; */

    & .rectangle_border {
      width: 410px;
      position: absolute;
      height: 200px;
      background-image: url(${rectangle});
      background-repeat: no-repeat;
      top: 80px;
      animation: floating 5s ease-in-out infinite alternate;
    }

    & .rectangle_image {
      width: 410px;
      position: absolute;
      height: 200px;
      top: 110px;
      background-image: url(${rectangleImg});
      background-repeat: no-repeat;
    }

    & .rectangle_union {
      width: 120px;
      height: 100px;
      background-image: url(${union});
      background-repeat: no-repeat;
      animation: floating 8s ease-in-out infinite alternate;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  #login {
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    /* position: absolute;
    left: 62px;
    top: 200px; */
  }

  .forgotPass {
    line-height: 10px;
    text-align: right;
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    font-size: 13px;
    font-weight: 400;

    & a {
      color: #767677;
      text-decoration: none;
    }

    & span {
      color: #c1c1c2;
    }
  }

  .createAccount {
    line-height: 20px;
    text-align: center;
    width: 60%;
    font-family: "Inter";
    font-style: normal;
    font-size: 13px;
    font-weight: 400;
    margin-top: 20px;

    & a {
      color: #767677;
      text-decoration: none;
    }

    & span {
      color: #c1c1c2;
    }
  }
`;
