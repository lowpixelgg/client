import { Fragment } from "react";
import { GlobalStyles } from "./global/GlobalStyles";
import { Framebar } from "./components/Framebar"
import Router from "./routes"

const App = () => {
  return (
    <Fragment>
      <Framebar />
      <GlobalStyles />
      <Router />
    </Fragment>
  )
}

export default App
