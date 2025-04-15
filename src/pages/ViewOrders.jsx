// import React, { useEffect, useState } from "react";

// const ViewOrders = () => {
//   const loggedInSeller = sessionStorage.getItem("loggedInSeller");
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const allOrders = JSON.parse(sessionStorage.getItem("orders")) || [];
//     const sellerOrders = allOrders.filter((order) => order.seller === loggedInSeller);
//     setOrders(sellerOrders);
//   }, [loggedInSeller]);

//   return (
//     <div className="container my-5">
//       <h2>Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Product</th>
//               <th>Buyer</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{order.title}</td>
//                 <td>{order.buyer}</td>
//                 <td>{order.quantity || 1}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewOrders;


import React, { useEffect, useState } from "react";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from sessionStorage
    const allOrders = JSON.parse(sessionStorage.getItem("allOrders")) || [];
    setOrders(allOrders); // Set the fetched orders to the state
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Order #{index + 1}</h5>
                  <p className="card-text">
                    <strong>Product:</strong> {order.title}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${order.price}
                  </p>
                  <p className="card-text">
                    <strong>Quantity:</strong> {order.quantity || 1}
                  </p>
                  <p className="card-text">
                    <strong>Buyer Email:</strong> {order.buyerData?.email || "N/A"}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {order.buyerData?.address || "N/A"}
                  </p>
                  <p className="card-text">
                    <strong>Seller ID:</strong> {order.sellerId || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;