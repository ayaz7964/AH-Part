import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Switch,
  Typography,
  Link,
} from "@mui/material";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login validation
    const allUsersData = JSON.parse(sessionStorage.getItem("allUsersData")) || {};
    const userData = allUsersData[login.email];

    if (!userData || userData.password !== login.password) {
      alert("Invalid email or password!");
      return;
    }

    // Check user role and redirect accordingly
    if (userData.role === "seller") {
      sessionStorage.setItem("currentLogin", JSON.stringify({ role: "seller", email: login.email }));
      
      navigate("/seller-dashboard");
    } else if (userData.role === "buyer") {
      sessionStorage.setItem("currentLogin", JSON.stringify({ role: "buyer", ...userData }));
     
      navigate("/");
    } else {
      alert("Invalid role! Please contact support.");
    }
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

      {/* Login Section */}
      <Container maxWidth="md" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Paper elevation={3} sx={{ padding: "30px", borderRadius: "10px", width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            {/* Left Section: Image */}
            <Grid item xs={12} md={6}>
              <img
                src="https://cdn.pixabay.com/photo/2021/12/27/19/28/e-commerce-6898102_1280.png"
                alt="Login Illustration"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Grid>

            {/* Right Section: Login Form */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Welcome Back. Please Log In To Your Account.
                </Typography>
              </Box>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Switch color="primary" />
                    <Typography variant="body2">Remember Me</Typography>
                  </Box>
                  <Link href="#" underline="hover" color="primary">
                    Forgot Password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate("/register")}
                >
                  Create Account
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

export default Login;