import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Account } from "./pages/Account";
import { Graphics } from "./pages/Graphics";
import { Language } from "./pages/Language";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { Mta } from "./pages/Mta";
import { SettingsLayout } from "./pages/Settings/Layout";
import { Voice } from "./pages/Voice";
import { AuthProvider } from "./global/AuthContext";

const Routing = () => {
  const location = useLocation();

  const locationArr = location.pathname?.split("/") ?? [];
  return (
    <AnimatePresence mode="wait">
      <AuthProvider>
      <Routes location={location} key={locationArr[1]}>
        <Route path="/" element={<Login />} />
        <Route path="/init" element={<Main />} />

        <Route element={<SettingsLayout />}>
          <Route path="/settings/account" element={<Account />} />

          <Route path="/settings/privacy" element={<Voice />} />

          <Route path="/settings/media" element={<Voice />} />

          <Route path="/settings/mta" element={<Mta />} />

          <Route path="/settings/graphics" element={<Graphics />} />

          <Route path="/settings/language" element={<Language />} />
        </Route>
      </Routes>
      </AuthProvider>
    </AnimatePresence>
  );
};

export default Routing;
