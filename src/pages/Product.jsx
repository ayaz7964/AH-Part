import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [sessionProducts, setSessionProducts] = useState([]); // For session products
  const [loading, setLoading] = useState(false);

  const loggedInBuyer = sessionStorage.getItem("loggedInBuyer"); // Get the logged-in buyer's email

  const addProduct = (product) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const updatedCart = [
      ...cart,
      {
        ...product,
        buyer: loggedInBuyer, // Include buyer identity
      },
    ];
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Fetch products from the fake API
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const apiProduct = await response.json();

      // Fetch products from sessionStorage
      const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};
      const allSellerProducts = Object.values(allSellersData).flat(); // Combine all seller products
      const selectedProduct = allSellerProducts.find((item) => item.id === parseInt(id));

      // Combine API product and sessionStorage product
      const combinedProduct = selectedProduct || apiProduct;
      setProduct(combinedProduct);

      // Fetch similar products (same category)
      const similarFromAPI = await fetch(
        `https://fakestoreapi.com/products/category/${combinedProduct.category}`
      ).then((res) => res.json());

      const similarFromSession = allSellerProducts.filter(
        (item) => item.category === combinedProduct.category && item.id !== combinedProduct.id
      );

      setSimilarProducts([...similarFromAPI, ...similarFromSession]);

      // Set session products (all products from sessionStorage)
      setSessionProducts(allSellerProducts);

      setLoading(false);
    };

    fetchProducts();
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <div className="skeleton" style={{ height: "400px", width: "400px" }}></div>
        </div>
        <div className="col-md-6 py-5">
          <div className="skeleton" style={{ height: "30px", width: "250px" }}></div>
          <div className="skeleton" style={{ height: "90px" }}></div>
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <h3 className="display-6 my-4">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <button className="btn btn-outline-dark" onClick={() => addProduct(product)}>
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts.map((item, index) => (
          <div key={index} className="card mx-4 text-center">
            <img
              className="card-img-top p-3"
              src={item.image}
              alt="Card"
              height={300}
              width={300}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
            </div>
            <div className="card-body">
              <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                View
              </Link>
              <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ShowSessionProducts = () => (
    <div className="py-4 my-4">
      <h2>Other Session Products</h2>
      <div className="d-flex flex-wrap">
        {sessionProducts.map((item, index) => (
          <div key={index} className="card mx-4 text-center" style={{ width: "18rem" }}>
            <img
              className="card-img-top p-3"
              src={item.image}
              alt="Card"
              height={300}
              width={300}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name || item.title}</h5>
              <p className="card-text">${item.price}</p>
              <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>

      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {similarProducts.length > 0 ? <ShowSimilarProduct /> : "No similar products found"}
            </Marquee>
          </div>
        </div>
        <div className="row my-5 py-5">
          <ShowSessionProducts />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;