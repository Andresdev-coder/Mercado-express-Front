import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const addToCart = (product) => {
    setShoppingCart((previousCart) => {
      const productExists = previousCart.findIndex(
        (article) => article.id === product.id,
      );
      if (productExists >= 0) {
        const cartUpdated = [...previousCart];
        cartUpdated[productExists].amount += 1;
        return cartUpdated;
      } else {
        return [...previousCart, { ...product, amount: 1 }];
      }
    });
  };

  const updateQuantity = (productId, amount) => {
    setShoppingCart((previousCart) =>
      previousCart.map((product) =>
        product.id === productId
          ? { ...product, amount: product.amount + amount }
          : product,
      ),
    );
  };

  const deleteProduct = (productId) => {
    setShoppingCart((previousCart) =>
      previousCart.filter((product) => product.id != productId),
    );
  };
  return (
    <CartContext.Provider value={{ shoppingCart, addToCart, updateQuantity, deleteProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
