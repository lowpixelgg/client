import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: background-color 1s ease;
  background-color: #2929298b; //

  #frameResizableTop {
    height: 3px;
    width: 100%;
    -webkit-app-region: no-drag;
  }

  #frameMain {
    display: flex;
    height: 20px;
  }

  .frameResizableVert {
    width: 2px;
    -webkit-app-region: no-drag;
  }

  #frameContentWin {
    display: flex;
    justify-content: space-between;
    width: 100%;
    -webkit-app-region: drag;
  }

  #frameContentDarwin {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    -webkit-app-region: drag;
  }

  #frameTitleDock {
    margin-left: 10px;
    margin-top: -1px;
  }

  #frameTitleText {
    font-size: 11px;
    font-family: "Roboto";
    top: -10px;
    color: rgba(212, 212, 212, 0.774);
  }

  #frameButtonDockWin {
    -webkit-app-region: no-drag !important;
    position: relative;
    top: -2px;
    right: -2px;
    height: 22px;
  }

  #frameButtonDockDarwin {
    -webkit-app-region: no-drag !important;
    position: relative;
    top: -1px;
    right: -1px;
  }

  .frameButton {
    background: none;
    border: none;
    height: 22px;
    width: 39px;
    cursor: pointer;
  }

  .frameButton:hover {
    background: rgba(189, 189, 189, 0.43);
  }

  .frameButton:active {
    background: rgba(156, 156, 156, 0.43);
  }

  .frameButton:focus {
    outline: 0px;
  }

  #frameButton_close:hover,
  #frameButton_close:focus {
    background: rgba(255, 53, 53, 0.61) !important;
  }

  #frameButton_close:active {
    background: rgba(235, 0, 0, 0.61) !important;
  }
`;
