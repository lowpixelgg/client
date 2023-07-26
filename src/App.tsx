import { HashRouter, Routes, useNavigate } from "react-router-dom";
import { GlobalStyles } from "./global/GlobalStyles";
import { Framebar } from "./components/Framebar";
import Router from "./routes";
import { LanguageProvider } from "./global/LanguageContext";
import { Voip } from "./pages/Voip";
import { ipcRenderer } from "electron";

const App = () => {
  return (
    <HashRouter>
      <LanguageProvider>
        <Framebar />

        <GlobalStyles />
        <Router />
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;
