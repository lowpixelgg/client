import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/init" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
