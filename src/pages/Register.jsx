import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import {
  TextField,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user data to sessionStorage
    const allUsersData = JSON.parse(sessionStorage.getItem("allUsersData")) || {};
    allUsersData[register.email] = register;
    sessionStorage.setItem("allUsersData", JSON.stringify(allUsersData));

    
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Register Section */}
      <Container maxWidth="md" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Paper elevation={3} sx={{ padding: "30px", borderRadius: "10px", width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            {/* Left Section: Image */}
            <Grid item xs={12} md={6}>
              <img
                src="https://cdn.pixabay.com/photo/2021/12/27/19/28/e-commerce-6898102_1280.png"
                alt="Register Illustration"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Grid>

            {/* Right Section: Register Form */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Create Your Account
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={register.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={register.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="password"
                  value={register.password}
                  onChange={handleChange}
                  required
                />
                <TextField
                  select
                  label="Register as"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="role"
                  value={register.role}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="seller">Seller</MenuItem>
                  <MenuItem value="buyer">Buyer</MenuItem>
                </TextField>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Register;