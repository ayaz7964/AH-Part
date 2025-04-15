import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";

const AccountSettings = () => {
  const sellerData = JSON.parse(sessionStorage.getItem("sellerData")) || {};
  const [account, setAccount] = useState({
    email: sellerData.email || "",
    password: sellerData.password || "",
  });

  const handleUpdateAccount = () => {
    const updatedData = { ...sellerData, ...account };
    sessionStorage.setItem("sellerData", JSON.stringify(updatedData));
    alert("Account updated successfully!");
  };

  return (
    <Box padding="20px">
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={account.email}
        onChange={(e) => setAccount({ ...account, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={account.password}
        onChange={(e) => setAccount({ ...account, password: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateAccount}
        sx={{ mt: 2 }}
      >
        Update Account
      </Button>
    </Box>
  );
};

export default AccountSettings;