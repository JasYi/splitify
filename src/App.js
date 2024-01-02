import "./css/App.css";
import Home from "./pages/home";
import Results from "./pages/results";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
