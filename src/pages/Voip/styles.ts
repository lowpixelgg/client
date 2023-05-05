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

  .leaflet-container {
    background: #0a0a0a;
  }

  .leaflet-container .leaflet-marker-icon.playerIcon {
    border: 3.4px solid #484848;
    border-radius: 50%;
    transition: 0.2s ease;

    &.isTalking {
      border-color: #79a93b;
    }
  }

  .leaflet-container .leaflet-marker-icon {
    transition: transform 0.6s ease-in;
  }

  .voiceControls {
    padding: 8px 12px;
    position: absolute;
    left: 50%;
    bottom: 32px;
    margin: 0 auto;
    z-index: 2;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 12px;
    color: #f8f9fa;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    background: #0a0a0a;
    border: 1px solid #1b1b1b;
    border-radius: 36px;

    .username {
      width: 120px;

      strong {
        font-weight: 600;
      }

      p {
        font-size: 0.75rem;
      }
    }

    .avatar span {
      width: 16px;
      bottom: -4px;
      right: -4px;
    }

    button {
      display: flex;
      justify-content: center;
      color: #b9bbbe;
    }

    svg {
      transition: 0.25s ease-in-out;
    }

    button:hover svg {
      color: #f8f9fa;
    }
  }
`;
