import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { DetailsProduct } from "./components/DetailsProduct/DetailsProduct";
import { CartProvider } from "./components/CartContext/CartContext";
import { Cart } from "./components/Cart/Cart";
import { useState } from "react";
import { Search } from "./components/Search/Search";

function App() {

  const [searchTerm, setSearchTerm] = useState("")


  const handleSearch = (term) => {
    setSearchTerm(term.toLoweCase())
  }

  
  return (
    <>
      <CartProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home searchTerm = {searchTerm} />} />
            <Route path="/product/:id" element={<DetailsProduct />} />
            <Route path="/carrito" element={<Cart/>} />
            <Route path="/search" element={<Search onSearch = {handleSearch}/>} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}
export default App;
