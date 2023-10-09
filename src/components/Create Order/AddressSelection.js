import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddressSelection = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    // Fetch previously added addresses from your API endpoint
    axios.get("http://localhost:3001/api/v1/addresses").then((response) => {
      setAddresses(response.data);
    });
  }, []);

  const handleSelectAddress = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleAddAddress = () => {
    // Send a POST request to add a new address to your API
    axios.post("http://localhost:3001/api/v1/addresses", { address: newAddress })
      .then((response) => {
        // Update the list of addresses with the newly added one
        setAddresses([...addresses, response.data]);
        setNewAddress(""); // Clear the input field
      });
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Select
          value={selectedAddress}
          onChange={handleSelectAddress}
          fullWidth
        >
          <MenuItem value="">
            <em>Select an address</em>
          </MenuItem>
          {addresses.map((address) => (
            <MenuItem key={address.id} value={address.id}>
              {address.address}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Add a new address"
          fullWidth
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddAddress}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddressSelection;
