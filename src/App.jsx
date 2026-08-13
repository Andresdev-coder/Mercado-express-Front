import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { DetailsProduct } from "./components/DetailsProduct/DetailsProduct";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<DetailsProduct />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
