import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart); // Cart state
  const [currentLogin, setCurrentLogin] = useState(null); // State for current login
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const loginData = JSON.parse(sessionStorage.getItem("currentLogin")) || null;
    setCurrentLogin(loginData);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("currentLogin"); // Clear session
    setCurrentLogin(null); // Reset login state
    navigate("/"); // Redirect to home page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`); // Redirect to SearchResults page
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <NavLink className="navbar-brand fw-bold fs-3" to="/">
          <i className="fa fa-shopping-bag me-2"></i>ShopWithError404
        </NavLink>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>

          {/* Buttons Section */}
          <div className="d-flex">
            {currentLogin && currentLogin.role === "buyer" ? (
              <>
                <span className="btn btn-outline-light me-2 disabled">
                  <i className="fa fa-user-circle me-1"></i> {currentLogin.firstName}
                </span>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-out-alt me-1"></i> Logout
                </button>
              </>
            ) : (
              <>
              <NavLink to="/return" className="btn btn-outline-light">
              <i className="fa fa-undo me-1"></i> Returns 
            </NavLink>
                <NavLink to="/login" className="btn btn-outline-light me-2">
                  <i className="fa fa-sign-in-alt me-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-light me-2">
                  <i className="fa fa-user-plus me-1"></i> Register
                </NavLink>
              </>
            )}
            <NavLink to="/cart" className="btn btn-outline-light me-2">
              <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
            </NavLink>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;