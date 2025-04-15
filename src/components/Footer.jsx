import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          {/* About Section */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              E-Commerce
            </h5>
            <p>
              Your one-stop shop for the latest products. We provide high-quality items at affordable prices with fast delivery.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Quick Links
            </h5>
            <p>
              <a href="/" className="text-white text-decoration-none">
                Home
              </a>
            </p>
            <p>
              <a href="/product" className="text-white text-decoration-none">
                Products
              </a>
            </p>
            <p>
              <a href="/about" className="text-white text-decoration-none">
                About Us
              </a>
            </p>
            <p>
              <a href="/contact" className="text-white text-decoration-none">
                Contact Us
              </a>
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Contact
            </h5>
            <p>
              <i className="fas fa-home me-3"></i> 123 Main Street, City, Country
            </p>
            <p>
              <i className="fas fa-envelope me-3"></i> support@ecommerce.com
            </p>
            <p>
              <i className="fas fa-phone me-3"></i> +1 234 567 890
            </p>
            <p>
              <i className="fas fa-print me-3"></i> +1 234 567 891
            </p>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Follow Us
            </h5>
            <a
              href="https://facebook.com"
              className="text-white text-decoration-none me-4"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-white text-decoration-none me-4"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-white text-decoration-none me-4"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="text-white text-decoration-none me-4"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <hr className="my-3" />

        {/* Copyright Section */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/ayazhussain"
                className="text-white text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                Ayaz Hussain
              </a>
              . All Rights Reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <p className="text-center text-md-right">
              <a href="/privacy" className="text-white text-decoration-none">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/terms" className="text-white text-decoration-none">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;