import logo from "./logo.svg";
import "./css/App.css";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Callback from "./pages/callback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="./callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
