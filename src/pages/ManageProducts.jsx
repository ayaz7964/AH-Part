import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ManageProducts = () => {
  const loggedInSeller = sessionStorage.getItem("loggedInSeller"); // Get the logged-in seller's email
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    // Retrieve all sellers' data
    const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};

    // Get products for the logged-in seller
    const sellerProducts = Array.isArray(allSellersData[loggedInSeller])
      ? allSellersData[loggedInSeller]
      : []; // Ensure it's an array
    setProducts(sellerProducts);
  }, [loggedInSeller]);

  const handleAddProduct = () => {
    const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};
    const sellerProducts = Array.isArray(allSellersData[loggedInSeller])
      ? allSellersData[loggedInSeller]
      : [];

    // Add the new product with the seller's identity
    const updatedProducts = [
      ...sellerProducts,
      {
        id: sellerProducts.length + 1,
        ...newProduct,
        seller: loggedInSeller, // Include seller identity
      },
    ];

    // Update the seller's products in allSellersData
    allSellersData[loggedInSeller] = updatedProducts;
    sessionStorage.setItem("allSellersData", JSON.stringify(allSellersData));

    // Update the state
    setProducts(updatedProducts);

    // Reset the new product form
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });

    alert("Product added successfully!");
  };

  const handleRemoveProduct = (id) => {
    const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};
    const sellerProducts = Array.isArray(allSellersData[loggedInSeller])
      ? allSellersData[loggedInSeller]
      : [];

    // Remove the product by ID
    const updatedProducts = sellerProducts.filter((product) => product.id !== id);

    // Update the seller's products in allSellersData
    allSellersData[loggedInSeller] = updatedProducts;
    sessionStorage.setItem("allSellersData", JSON.stringify(allSellersData));

    // Update the state
    setProducts(updatedProducts);

    alert("Product removed successfully!");
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = () => {
    const allSellersData = JSON.parse(sessionStorage.getItem("allSellersData")) || {};
    const sellerProducts = Array.isArray(allSellersData[loggedInSeller])
      ? allSellersData[loggedInSeller]
      : [];

    // Update the product in the seller's product list
    const updatedProducts = sellerProducts.map((product) =>
      product.id === editProduct.id ? editProduct : product
    );

    // Update the seller's products in allSellersData
    allSellersData[loggedInSeller] = updatedProducts;
    sessionStorage.setItem("allSellersData", JSON.stringify(allSellersData));

    // Update the state
    setProducts(updatedProducts);

    setIsEditDialogOpen(false);
    alert("Product updated successfully!");
  };

  return (
    <Box padding="20px">
      <Typography variant="h4" gutterBottom>
        Manage Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body2">Price: {product.price}</Typography>
                <Typography variant="body2">Stock: {product.stock}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveProduct(product.id)}
                  sx={{ mt: 2, mr: 1 }}
                >
                  Remove
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditProduct(product)}
                  sx={{ mt: 2 }}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </Box>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct?.name || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct?.description || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct?.price || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct?.stock || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, stock: e.target.value })
            }
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct?.image || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageProducts;