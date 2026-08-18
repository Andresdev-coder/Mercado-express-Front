import { useCart } from "../CartContext/CartContext";
import "./Cart.css";
export const Cart = () => {
  const { shoppingCart, updateQuantity, deleteProduct } = useCart();

  const shippingCost = 10;
  const subTotal = shoppingCart.reduce(
    (acc, product) => acc + product.precio * product.amount, 0
  );

  const total = subTotal + shippingCost;

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, 1);
  };

  const handleDecreaseQuantity = (productId) => {
    const product = shoppingCart.find((item) => item.id === productId);
    if (product.amount > 1) {
      updateQuantity(productId, -1);
    }
  };

  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>
      {shoppingCart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Acción</p>
          </div>
          <ul className="cart-items">
            {shoppingCart.map((product) => {
              const totalprice = product.precio * product.amount;
              return (
                <li className="cart-item" key={product.id}>
                  <div className="product-info">
                    <img
                      src={product.image}
                      alt=""
                      className="product-images"
                    />
                    <span>{product.nombre}</span>
                  </div>
                  <p>${product.precio.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      readOnly
                      value={product.amount}
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncreaseQuantity(product.id)}
                    >
                      +
                    </button>
                  </div>
                  <p>${totalprice.toFixed(2)}</p>
                  <button className="delete-btn">
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteProduct(product.id)}
                    ></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <div className="cart-summary">
        <h2>
          TU <span>CARRITO</span>
        </h2>
        <p>
          Total Parcial: <span>${subTotal.toFixed(2)}</span>
        </p>
        <p>
          Tarifa de envío: <span>${shippingCost.toFixed(2)}</span>
        </p>
        <p className="total">
          Total: <span>${total.toFixed(2)}</span>
        </p>
        <button className="checkout-btn">PASAR POR LA CAJA</button>
      </div>
    </div>
  );
};
