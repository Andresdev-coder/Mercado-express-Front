import { useState } from "react";
import "./Search.css";

export const Search = ({ onSearch }) => {
  const [searchTerm, setsearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setsearchTerm(term);
    onSearch(term);
  };
  return (
    <section className="search">
      <input
        type="search"
        placeholder="Buscar"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </section>
  );
};
