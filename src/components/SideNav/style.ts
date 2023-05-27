import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;

  nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    .line {
      width: 18px;
      height: 2px;
      background: #f8f9fa;
    }

    button {
      transition: 0.2s ease;

      svg {
        color: #f8f9fa;
        transition: 0.2s ease;
      }
    }

    button:hover {
      transform: scale(1.45);

      .icon--settings {
        color: #6c757d;
      }

      .icon--link {
        color: #219ebc;
      }

      .icon--twitch {
        color: #6441a5;
      }

      .icon--insta {
        color: #d62976;
      }

      .icon--youtube {
        color: #ff0000;
      }

      .icon--discord {
        color: #5865f2;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .sidebar {
      position: absolute;
      top: 8px;
      right: 8px;

      &:hover nav {
        display: flex;
      }

      nav {
        display: none;
        padding: 8px;
        background: #212529;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        animation: open 0.2s ease-in;
        transform-origin: top center;
      }

      @keyframes open {
        0% {
          opacity: 0;
          transform: scaleY(0.4);
        }
        100% {
          opacity: 1;
          transform: scaleY(1);
        }
      }
    }
  }
`;
