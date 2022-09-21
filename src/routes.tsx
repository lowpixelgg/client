import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;