import { useParams } from "react-router-dom";
import { useState } from "react";
import "./DetailsProduct.css";
import { useEffect } from "react";

export const DetailsProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api-ten-jet.vercel.app/products/${id}`,
        );
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del producto");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  return (
    <div className="product-details">
      {product ? (
        <>
          <img
            src={product.image}
            alt={product.nombre}
            className="image-small"
          />
          <img src={product.image} alt={product.nombre} />
          <div className="product-infos">
            <h1>{product.nombre}</h1>
            <p className="price">{product.precio}</p>
            <p className="description">{product.descripcion}</p>
            <div className="size-options">
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
            <button className="add-to-cart">Añadir al carrito</button>
            <p className="note">
              Producto 100% original. El pago contra reembolso está disponible
              para este producto. Política de devolución y cambio fácil dentro
              de los 7 días.
            </p>
          </div>
        </>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};
