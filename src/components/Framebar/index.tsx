import { Container } from "./styles";
import { ipcRenderer } from "electron";


export const Framebar = () => {
  const action = (action: string) => {
    switch (action) {
      case "close":
        ipcRenderer.send("window-take-closed");
        break;
      case "maximize":
        ipcRenderer.send("window-take-toggleMaximized");
        break;
      case "minimize":
        ipcRenderer.send("window-take-minimized");
        break;
    }
  };

  return (
    <Container>
      <div id="frameBar">
        <div id="frameResizableTop" className="frameDragPadder"></div>
        <div id="frameMain">
          <div className="frameResizableVert frameDragPadder"></div>
          <div id="frameContentWin">
            <div id="frameTitleDock">
              <span id="frameTitleText">ROCKET CLIENT (Public Preview Release, November 2023)</span>
            </div>
            <div id="frameButtonDockWin">
              <button
                className="frameButton fMb"
                id="frameButton_minimize"
                onClick={() => action("minimize")}
              >
                <svg
                  name="TitleBarMinimize"
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                >
                  <rect
                    stroke="#ffffff"
                    fill="#ffffff"
                    width="10"
                    height="1"
                    x="1"
                    y="6"
                  ></rect>
                </svg>
              </button>

              {/* <button
                className="frameButton fRb"
                id="frameButton_maximize"
                onClick={() => action("maximize")}
              >
                <svg
                  name="TitleBarMaximize"
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                >
                  <rect
                    width="9"
                    height="9"
                    x="1.5"
                    y="1.5"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.4px"
                  ></rect>
                </svg>
              </button> */}

              <button
                className="frameButton fCb"
                id="frameButton_close"
                onClick={() => {
                  action("close");
                }}
              >
                <svg
                  name="TitleBarClose"
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                >
                  <polygon
                    stroke="#ffffff"
                    fill="#ffffff"
                    fillRule="evenodd"
                    points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"
                  ></polygon>
                </svg>
              </button>
            </div>
          </div>
          <div className="frameResizableVert frameDragPadder"></div>
        </div>
      </div>
    </Container>
  );
};
