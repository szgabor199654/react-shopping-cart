// feature 1
import data from "./data.json";
import { useState } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
function App() {
  const [state, setState] = useState({
    products: data.products,
    size: "",
    sort: "",
  });

  const sortProducts = (e) => {
    setState({
      ...state,
      products: state.products.sort((a, b) =>
        e.target.value === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : e.target.value === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id < b._id
          ? 1
          : -1
      ),
      sort: e.target.value,
    });
  };

  const filterProducts = (e) => {
    if (e.target.value === "") {
      setState({
        ...state,
        products: data.products,
        size: e.target.value,
      });
    } else {
      setState({
        ...state,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
        size: e.target.value,
      });
    }
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={state.products.length}
              size={state.size}
              sort={state.sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={state.products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;
