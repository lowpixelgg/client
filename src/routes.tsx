import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Account } from "./pages/Account";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { SettingsLayout } from "./pages/Settings/Layout";

const Routing = () => {
  const location = useLocation();

  const locationArr = location.pathname?.split("/") ?? [];
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={locationArr[1]}>
        <Route path="/" element={<Login />} />

        <Route path="/init" element={<Main />} />

        <Route element={<SettingsLayout />}>
          <Route path="/settings" element={<Account />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Routing;
