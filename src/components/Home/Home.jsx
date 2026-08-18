import { useState } from "react";
import { ProductList } from "../ProductList/ProductList";
import { Search } from "../Search/Search";

export const Home = ({searchTerm}) => {
  const [searchTermLocal, setSearchTermLocal] = useState("")

  const handleSearch = (term) => {
    setSearchTermLocal(term)
  }
  return (
    <>
      <Search onSearch = {handleSearch} />
      <ProductList searchTerm = {searchTermLocal || searchTerm}/>
    </>
  );
};
