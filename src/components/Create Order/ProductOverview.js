import { SearchOutlined, ShoppingCart } from "@mui/icons-material";
import { AppBar, Box, Button, Grid, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProductOverview = ({ product, quantity }) => {
  return (
    <Grid container padding={2} spacing={2}>
        <Grid item xs={4}>
          <img src={product.imageURL} alt="Product Image" height={400} width={"auto"} style={{maxWidth: 500}}/>
        </Grid>
        <Grid item xs={6}>
              <Grid>
              <Typography variant="h5" component="div" mb={3}>
                {product.name}
              </Typography>
              <Typography>Quantity:{quantity}</Typography>
              <Typography mb={3}>
                Category:{" "}
                <p style={{ display: "inline", fontWeight: "bold" }}>
                  {product.category}
                </p>
              </Typography>
              <Typography mb={3}>{product.description}</Typography>
              <Typography mb={3} variant="h5" color={"red"}>Total Price: ₹{product.price}</Typography>
          </Grid>
        </Grid>
      </Grid>
    // </Grid>
  );
};

export default ProductOverview;
