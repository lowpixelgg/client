import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Container, CustomMuiStyles } from "./styles";
import { MdArrowForwardIos } from "react-icons/md";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IoMdClose } from "react-icons/io";
import {TbDoorExit} from 'react-icons/tb'

import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, ClickAwayListener, Snackbar } from "@mui/material";

import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

import AuthContext from "@/global/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const SettingsLayout = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  const [showNav, setShowNav] = useState(false);
  const [alertTip, setAlertTip] = useState(false);

  const CopyId = () => {
    setAlertTip(true);
    navigator.clipboard.writeText("a6e19347-3927");
  };

  const {signOut} = useContext(AuthContext);

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
          <h1>{langObj.Config[0]}</h1>

          <Link to="/init">
            <IoMdClose size={24} color="#f8f9fa" />
          </Link>
        </div>

        <NavLink to="/settings/account">{langObj.Config[1]}</NavLink>

        <NavLink to="/settings/privacy">
          <span>{langObj.Config[2]}</span>
          <MdArrowForwardIos size={14} />
        </NavLink>

        <hr />

        <NavLink to="/settings/media">{langObj.Config[3]}</NavLink>

        <NavLink to="/settings/mta">{langObj.Config[4]}</NavLink>

        <NavLink to="/settings/graphics">{langObj.Config[5]}</NavLink>

        <NavLink to="/settings/language">
          <span>{langObj.Config[6]}</span>
          <MdArrowForwardIos size={14} />
        </NavLink>

        <hr />

        <button onClick={CopyId}>{langObj.Config[7]}</button>
        <span onClick={signOut}>{langObj.Config[8]} </span>
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
