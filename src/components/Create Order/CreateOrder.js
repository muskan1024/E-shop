import React, { useState } from "react";
import { Stepper, Step, StepLabel, Grid, Paper } from "@mui/material";
import { SearchOutlined, ShoppingCart } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import ProductOverview from "./ProductOverview";
import AddressSelection from "./AddressSelection";
import ConfirmOrder from "./ConfirmOrder";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


const steps = ["Product Overview", "Address Selection", "Confirm Order"];

const CreateOrder = () => {
  const location = useLocation();
  const product = location.state.product;
  const quantity = location.state.quantity;
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    handleNext();
  };

  const handleConfirmOrder = () => {
    // Make API requests to create the order and add the address (if it's a new one)
    // Set orderConfirmed to true upon success
  };

  const getStepContent = (activeStep) => {
    if (activeStep === 0) {
      return (
        <ProductOverview product={product} quantity={quantity} onNext={handleNext} />
      );
    } else if (activeStep === 1) {
      return (
        <AddressSelection
          selectedAddress={selectedAddress}
          onAddressSelect={handleAddressSelect} 
          onNext={handleNext}
        />
      );
    } else if (activeStep === 2) {
      return (
        <ConfirmOrder
          product={product}
          selectedAddress={selectedAddress}
          onConfirm={handleConfirmOrder}
        />
      );
    }
  };

  return (
    <Grid container >
      <Grid item xs={4}>
        <Box>
          <AppBar>
            <Toolbar>
              <Grid>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="icon"
                  sx={{ mr: 2 }}
                >
                  <ShoppingCart />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  upGrad E-shop
                </Typography>
              </Grid>
              <SearchOutlined/>
              <Grid item xs={4} >
              <TextField
                fullWidth
                sx={{ background:"#66aee8bd", float:"right"}}
                inputProps={{ style: { color: 'white', }}}
                label="Search"
                variant="filled"
                size= "small"
                InputLabelProps={{
                  sx: {
                    color: "white",
                  }
                }}
              ></TextField>
              </Grid>
              <Grid container xs={4} justifyContent={"right"}>
                <Grid>
                  <Link to="/products">
                    <Button
                      sx={{
                        color: "white",
                        textDecoration: "underline",
                        float: "left",
                      }}
                    >
                      Home
                    </Button>
                  </Link>
                </Grid>
                <Grid>
                  <Link to="/">
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ float: "right" }}
                    >
                      Logout
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid container justifyContent={"center"}>
      <Grid item xs={12} padding={2}>
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </Grid>
    <Grid item xs={12}>
    {activeStep === steps.length ? (
      <Grid>
        {orderConfirmed ? (
          <p>Your order is confirmed.</p>
        ) : (
          <p>Confirming order...</p>
        )}
      </Grid>
    ) : (
      <Grid item xs={12}>
        {getStepContent(activeStep)}
      </Grid>
    )}
  </Grid>
      <Paper>
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          )}
        </div>
      </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateOrder;
