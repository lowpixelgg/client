import styled from "styled-components";
import logo from "../../assets/logos/dreams.png"

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 22px);
  background: radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.274) 100%);
  z-index: 10;

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
    position: absolute;

    /* left: 542.32px;
    top: 289.41px; */

    & .rectangle_border {
      position: absolute;
      left: 542.32px;
      top: 262px;
      animation: floating 5s ease-in-out infinite alternate;
    }

    & .rectangle_image {
      position: absolute;
      left: 542.32px;
      top: 289.41px;
    }

    & .rectangle_union {
      position: absolute;
      left: 684.42px;
      top: 154px;
      animation: floating 8s ease-in-out infinite alternate;
    }
  }



  #login {
    display: flex;
    position: absolute;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    left: 62px;
    top: 200px;
  }

  .forgotPass {
    line-height: 10px;
    text-align: right;
    width: 100%;
    font-family: 'Inter';
    font-style: normal;
    font-size: 13px;
    font-weight: 400;
  
    & a{
      color: #767677;
      text-decoration: none;
    }

    & span{
      color: #C1C1C2;
    }
  }

  .createAccount {
    line-height: 20px;
    text-align: center;
    width: 60%;
    font-family: 'Inter';
    font-style: normal;
    font-size: 13px;
    font-weight: 400;
    margin-top: 20px;
  
    & a{
      color: #767677;
      text-decoration: none;
    }

    & span{
      color: #C1C1C2;
    }
  }


  #footer {
    position: absolute;
    text-decoration: none;
    bottom: 0;
    margin-left: 20px;

    & a {
      float: left;
      display: block;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      transition: all ease-in-out .3s;
      color: #767677;
      text-align: center;
      padding: 20px 10px;
      text-decoration: none;
    }

    & a:hover {
      color: #cecece;
      transition: all ease-in-out .4s;
    }
  }
`