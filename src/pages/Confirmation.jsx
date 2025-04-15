import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="container my-5 text-center">
      <h1 className="display-4 text-success">Congratulations!</h1>
      <p className="lead">Your order has been placed successfully.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Confirmation;