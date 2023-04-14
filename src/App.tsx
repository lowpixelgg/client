import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./global/GlobalStyles";
import { Framebar } from "./components/Framebar";
import Router from "./routes";
import { LanguageProvider } from "./global/LanguageContext";

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Framebar />

        <GlobalStyles />
        <Router />
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
