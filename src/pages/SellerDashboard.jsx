import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ManageProducts from "./ManageProducts";
import ViewOrders from "./ViewOrders";
import AccountSettings from "./AccountSettings";

const SellerDashboard = () => {
  const [activeSection, setActiveSection] = useState("ManageProducts");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage and redirect to home page
    sessionStorage.removeItem("loggedInSeller");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "ManageProducts":
        return <ManageProducts />;
      case "ViewOrders":
        return <ViewOrders />;
      case "AccountSettings":
        return <AccountSettings />;
      default:
        return <Typography variant="h6">Select a section from the sidebar</Typography>;
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Seller Dashboard
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveSection("ManageProducts")}>
              <ListItemText primary="Manage Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveSection("ViewOrders")}>
              <ListItemText primary="View Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveSection("AccountSettings")}>
              <ListItemText primary="Account Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box flexGrow={1} padding="20px">
        <AppBar position="static" sx={{ backgroundColor: "#673ab7" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Seller Dashboard
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Logout
            </Button>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>S</Avatar>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 3 }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default SellerDashboard;