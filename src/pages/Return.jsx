import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import { Footer, Navbar } from "../components";

const Return = () => {
  
  // Form state to store user inputs
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    buyerEmail: "",
    productId: "",
    storeName: "",
    problem: "",
    images: [],
  });

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      images: Array.from(files),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the template parameters to send to EmailJS
    const templateParams = {
      name: formData.name,
      contactEmail: formData.contactEmail,
      buyerEmail: formData.buyerEmail,
      productId: formData.productId,
      storeName: formData.storeName,
      problem: formData.problem,
      imageList: formData.images.map((img) => img.name).join(", "), // Send image names only
    };

    // Send email using EmailJS
    emailjs
      .send(
        "service_0yi9pwk", // Your EmailJS Service ID
        "template_n1k1qld", // Your EmailJS Template ID
        templateParams,
        "altatA3C7c-CJCHOT" // Your Public Key
      )
      .then(
        (result) => {
          console.log("✅ Email sent:", result.text);
          alert("Return email sent to buyer successfully!");
        },
        (error) => {
          console.error("❌ Email sending failed:", error.text);
          alert("Failed to send email.");
        }
      );

    // Download JSON file after email is sent
    const jsonData = JSON.stringify(
      {
        ...formData,
        images: formData.images.map((img) => img.name), // Store the image names in the file
      },
      null,
      2
    );

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "return-details.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <Navbar/>
    
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Return Form</h1>

        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Buyer Email</label>
          <input
            type="email"
            name="buyerEmail"
            value={formData.buyerEmail}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Store Name</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Problem Description</label>
          <textarea
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={styles.input}
          />
        </div>

        <div>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    
    </>
    
  );
};

// Styles
const styles = {
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Makes the form center vertically
    padding: "0 20px",
    boxSizing: "border-box",
  },
  form: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px", // Maximum width of the form
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    minHeight: "120px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Return;
