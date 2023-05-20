import { HashRouter } from "react-router-dom";
import { GlobalStyles } from "./global/GlobalStyles";
import { Framebar } from "./components/Framebar";
import Router from "./routes";
import { LanguageProvider } from "./global/LanguageContext";

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
