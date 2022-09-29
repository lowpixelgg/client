import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./global/GlobalStyles";
import { Framebar } from "./components/Framebar";
import Router from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Framebar />

      <GlobalStyles />

      <Router />
    </BrowserRouter>
  );
};

export default App;
