import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer
import toast from "react-hot-toast";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state; // Access the product details passed via state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  useEffect(() => {
    // Fetch products for the "You May Also Like" section
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products/");
      const products = await response.json();

      // Filter out the current product and select 4 random products
      const filteredProducts = products.filter((p) => p.id !== product.id);
      const randomProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 4);

      setRelatedProducts(randomProducts);
    };

    fetchProducts();
  }, [product]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Product Details Section */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1>{product.title || product.name}</h1>
            <p className="lead">{product.description || "No description available"}</p>
            <h3 className="text-muted">$ {product.price}</h3>
            <button
              className="btn btn-dark m-2"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-outline-dark m-2"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="container my-5">
        <h3 className="text-center mb-4">You May Also Like</h3>
        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  height={200}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {relatedProduct.title.substring(0, 15)}...
                  </h5>
                  <p className="card-text text-muted">
                    $ {relatedProduct.price}
                  </p>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() =>
                      navigate("/product-details", { state: { product: relatedProduct } })
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductDetails;