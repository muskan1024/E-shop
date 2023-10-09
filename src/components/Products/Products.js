import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
  return (
    <Grid item xs="3">
      <Card sx={{ height: 520 }}>
        <Grid container alignItems={"center"} justifyContent="center">
          <img src={product.imageURL} height={250} />
        </Grid>
        <CardContent>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="h5" component="div">
            ₹{product.price}
          </Typography>
          <Typography
            sx={{ mb: 1.5, overflow: "auto", height: 100 }}
            color="text.secondary"
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/product/${product._id}`}>
            <Button variant="contained">Buy</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Products;
