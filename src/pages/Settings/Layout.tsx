import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Container, CustomMuiStyles } from "./styles";
import { MdArrowForwardIos } from "react-icons/md";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IoMdClose } from "react-icons/io";

import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, ClickAwayListener, Snackbar } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const SettingsLayout = () => {
  const [showNav, setShowNav] = useState(false);
  const [alertTip, setAlertTip] = useState(false);

  const CopyId = () => {
    setAlertTip(true);
    navigator.clipboard.writeText("a6e19347-3927");
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={() => setShowNav(false)}>
        <button className="menu" onClick={() => setShowNav(!showNav)}>
          {showNav ? (
            <IoClose color="#f8f8fa" size={24} />
          ) : (
            <IoMenu color="#f8f8fa" size={24} />
          )}
        </button>
      </ClickAwayListener>

      <nav className={`${showNav && "active"}`}>
        <div className="head">
          <h1>Settings</h1>

          <Link to="/init">
            <IoMdClose size={24} color="#f8f9fa" />
          </Link>
        </div>

        <NavLink to="/settings/account">Minha Conta</NavLink>

        <NavLink to="/settings/privacy">
          <span>Privacidade</span>
          <MdArrowForwardIos size={14} />
        </NavLink>

        <hr />

        <NavLink to="/settings/media">Voz e vídeo</NavLink>

        <NavLink to="/settings/mta">Multi Theft Auto</NavLink>

        <NavLink to="/settings/graphics">Vídeo e gráficos</NavLink>

        <NavLink to="/settings/language">
          <span>Idioma</span>
          <MdArrowForwardIos size={14} />
        </NavLink>

        <hr />

        <button onClick={CopyId}>Copy ID</button>

        <Snackbar
          open={alertTip}
          autoHideDuration={2000}
          onClose={() => setAlertTip(false)}
        >
          <Alert
            onClose={() => setAlertTip(false)}
            severity="info"
            variant="filled"
            sx={{ background: "#5090D3 !important" }}
          >
            Id copiado!
          </Alert>
        </Snackbar>
      </nav>

      <ThemeProvider theme={darkTheme}>
        <CustomMuiStyles />

        <Outlet />
      </ThemeProvider>
    </Container>
  );
};
