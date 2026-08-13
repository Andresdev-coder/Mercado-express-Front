import { useState, useEffect } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("Relevante");
  const [filters, setFilters] = useState({ categories: [], types: [] });
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api-ten-jet.vercel.app/products");
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const toggleFilters = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const filtersProducts = products.filter((product) => {
    const matchCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.categoria);
    const matchType =
      filters.types.length === 0 || filters.types.includes(product.tipo);

    return matchCategory && matchType;
  });

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const orderProducts = [...filtersProducts].sort((a, b) => {
    if (order === "Precio: Menor a Mayor") {
      return a.precio - b.precio;
    }
    if (order === "Precio: Mayor a Menor") {
      return b.precio - a.precio;
    }
    return 0;
  });

  const handleImageCLick = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filters-category">
          <div className="filter-category">
            <h3>Categorias</h3>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleFilters("categories", "Hombres")}
              />
              <span>Hombres</span>
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleFilters("categories", "Mujeres")}
              />
              <span>Mujeres</span>
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleFilters("categories", "Niños")}
              />
              <span>Niños</span>
            </label>
          </div>
          <div className="filter-category">
            <h3>Tipos</h3>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleFilters("types", "Prendas de abrigo")}
              />
              <span>Prendas de abrigo</span>
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleFilters("types", "Ropa interior")}
              />
              <span>Ropa interior</span>
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleFilters("types", "Calzado")}
              />
              <span>Calzado</span>
            </label>
          </div>
        </div>
      </aside>
      <main className="collections">
        <div className="options">
          <h2>TODAS LAS COLECCIONES</h2>
          <div className="sort-options">
            <label>
              Ordenar por:
              <select onChange={handleOrderChange} value={order}>
                <option>Relevante</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
              </select>
            </label>
          </div>
        </div>
        <div className="products">
          {error ? (
            <p className="error-message">{error}</p>
          ) : filtersProducts.length > 0 ? (
            orderProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.image}
                  className="product-image" onClick={() => handleImageCLick(product.id)}
                />
                <h3>{product.nombre}</h3>
                <p>{product.precio}</p>
              </div>
            ))
          ) : (
            <p className="no-results">
              No hay productos que coincidan con los filtros seleccionados
            </p>
          )}
        </div>
      </main>
    </section>
  );
};
