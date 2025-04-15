import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // React Router's navigate hook
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products from the fake API
      const response = await fetch("https://fakestoreapi.com/products/");
      const apiProducts = await response.json();

      // Fetch seller-added products from sessionStorage
      const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};
      const sellerProducts = Object.values(allSellersData).flat();

      // Combine API products and seller-added products
      const combinedProducts = [...apiProducts, ...sellerProducts];

      // Filter products based on the search query
      const filteredResults = combinedProducts.filter((product) =>
        product.title?.toLowerCase().includes(query.toLowerCase()) ||
        product.name?.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredResults);
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <>
      <Navbar /> {/* Add Navbar */}
      <div className="container my-5">
        <h2 className="text-center">Search Results for "{query}"</h2>
        <div className="row">
          {results.length > 0 ? (
            results.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100 text-center">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={product.title || product.name}
                    height="250"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title || product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/product-details", { state: { product } })}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </div>
      <Footer /> {/* Add Footer */}
    </>
  );
};

export default SearchResults;