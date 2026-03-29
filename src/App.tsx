import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import { PortfolioProvider } from "./context/PortfolioContext";
import "./styles/global.scss";

function App() {
  return (
    <PortfolioProvider>
      <Router basename="/portfolio">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
