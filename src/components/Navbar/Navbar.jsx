import { useCart } from "../CartContext/CartContext";
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { shoppingCart } = useCart();
  const totalProducts = shoppingCart.reduce(
    (acc, product) => acc + product.amount,
    0,
  );
  return (
    <section className="header">
      <h1 className="logo">
        {" "}
        Mercado<span>Express</span>
      </h1>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
        <Link to="/carrito" className="icon-button">
          <i className="fas fa-shopping-cart"></i>
          <span className="counter">{totalProducts}</span>
        </Link>
      </div>
    </section>
  );
};
