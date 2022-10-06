import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Container, CustomMuiStyles } from "./styles";
import { MdArrowForwardIos } from "react-icons/md";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const SettingsLayout = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <Container>
      <button className="menu" onClick={() => setShowNav(!showNav)}>
        {showNav ? (
          <IoClose color="#f8f8fa" size={24} />
        ) : (
          <IoMenu color="#f8f8fa" size={24} />
        )}
      </button>

      <nav className={`${showNav && "active"}`}>
        <h1>Settings</h1>

        <NavLink to="/settings/account">Minha Conta</NavLink>

        <NavLink to="/settings/privacy">
          <span>Privacidade</span>
          <MdArrowForwardIos size={16} />
        </NavLink>

        <hr />

        <NavLink to="/settings/media">Voz e vídeo</NavLink>

        <NavLink to="/settings/mta">Multi Theft Auto</NavLink>

        <NavLink to="/settings/graphics">Vídeo e gráficos</NavLink>

        <NavLink to="/settings/language">
          <span>Idioma</span>
          <MdArrowForwardIos size={16} />
        </NavLink>

        <hr />

        <a>Copy ID</a>
      </nav>

      <ThemeProvider theme={darkTheme}>
        <CustomMuiStyles />

        <Outlet />
      </ThemeProvider>
    </Container>
  );
};
