// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addCart } from "../redux/action";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Products = () => {
//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState([]);
//   const [loading, setLoading] = useState(false);
//   let componentMounted = true;

//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // React Router's navigate hook

//   const addProduct = (product) => {
//     dispatch(addCart(product));
//   };

//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);

//       // Fetch products from the fake API
//       const response = await fetch("https://fakestoreapi.com/products/");
//       const apiProducts = await response.json();

//       // Fetch seller-added products from sessionStorage
//       const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};
//       const sellerProducts = Object.values(allSellersData).flat(); // Combine all seller products

//       // Combine API products and seller-added products
//       const combinedProducts = [...apiProducts, ...sellerProducts];

//       if (componentMounted) {
//         setData(combinedProducts);
//         setFilter(combinedProducts);
//         setLoading(false);
//       }

//       return () => {
//         componentMounted = false;
//       };
//     };

//     getProducts();
//   }, []);

//   const Loading = () => {
//     return (
//       <>
//         <div className="col-12 py-5 text-center">
//           <Skeleton height={40} width={560} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//       </>
//     );
//   };

//   const filterProduct = (cat) => {
//     if (cat === "All") {
//       setFilter(data);
//     } else {
//       const updatedList = data.filter((item) => item.category === cat);
//       setFilter(updatedList);
//     }
//   };

//   const ShowProducts = () => {
//     return (
//       <>
//         <div className="buttons text-center py-5">
//           <button
//             className="btn btn-outline-dark btn-sm m-2"
//             onClick={() => filterProduct("All")}
//           >
//             All
//           </button>
//           <button
//             className="btn btn-outline-dark btn-sm m-2"
//             onClick={() => filterProduct("men's clothing")}
//           >
//             Men's Clothing
//           </button>
//           <button
//             className="btn btn-outline-dark btn-sm m-2"
//             onClick={() => filterProduct("women's clothing")}
//           >
//             Women's Clothing
//           </button>
//           <button
//             className="btn btn-outline-dark btn-sm m-2"
//             onClick={() => filterProduct("jewelery")}
//           >
//             Jewelery
//           </button>
//           <button
//             className="btn btn-outline-dark btn-sm m-2"
//             onClick={() => filterProduct("electronics")}
//           >
//             Electronics
//           </button>
//         </div>

//         {filter.map((product, index) => {
//           return (
//             <div
//               id={product.id || `session-${index}`}
//               key={product.id || `session-${index}`}
//               className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
//             >
//               <div className="card text-center h-100">
//                 <img
//                   className="card-img-top p-3"
//                   src={product.image}
//                   alt="Card"
//                   height={300}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">
//                     {product.title?.substring(0, 12) || product.name?.substring(0, 12)}...
//                   </h5>
//                   <p className="card-text">
//                     {product.description?.substring(0, 90) || "No description available"}...
//                   </p>
//                 </div>
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item lead">$ {product.price}</li>
//                 </ul>
//                 <div className="card-body">
//                   <button
//                     className="btn btn-dark m-1"
//                     onClick={() => navigate("/checkout", { state: { product } })}
//                   >
//                     Buy Now
//                   </button>
//                   <button
//                     className="btn btn-dark m-1"
//                     onClick={() => {
//                       toast.success("Added to cart");
//                       addProduct(product);
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="container my-3 py-3">
//         <div className="row">
//           <div className="col-12">
//             <h2 className="display-5 text-center">Latest Products</h2>
//             <hr />
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           {loading ? <Loading /> : <ShowProducts />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;


import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router's navigate hook

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      // Fetch products from the fake API
      const response = await fetch("https://fakestoreapi.com/products/");
      const apiProducts = await response.json();

      // Fetch seller-added products from sessionStorage
      const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};
      const sellerProducts = Object.values(allSellersData).flat(); // Combine all seller products

      // Combine API products and seller-added products
      const combinedProducts = [...apiProducts, ...sellerProducts];

      if (componentMounted) {
        setData(combinedProducts);
        setFilter(combinedProducts);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    if (cat === "All") {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => item.category === cat);
      setFilter(updatedList);
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("All")}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product, index) => {
          return (
            <div
              id={product.id || `session-${index}`}
              key={product.id || `session-${index}`}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title?.substring(0, 12) || product.name?.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description?.substring(0, 90) || "No description available"}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => navigate("/checkout", { state: { product } })}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-dark m-1"
                    onClick={() => navigate("/product-details", { state: { product } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;