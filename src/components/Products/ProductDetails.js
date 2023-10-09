import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    AppBar,
    Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ProductCategoryTab from "./ProductCategoryTab";
import { SearchOutlined, ShoppingCart } from "@mui/icons-material";
import CreateOrder from "../Create Order/CreateOrder";

const ProductDetails = (props) => {
  const history = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product details from the API using the 'id' parameter from the URL
    axios
      .get(`http://localhost:3001/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]); // Use 'id' as the dependency for the useEffect

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleBuyClick = () => {  
    history(`/product/${id}/orderdetails`, { state: { product: product, quantity: quantity  } });
  };

  return (
    <Grid container padding={2} spacing={2}>
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
                      // onClick={handleLogout}
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
      <Grid
        item
        xs={12}
        alignItems={"center"}
        justifyContent={"center"}
        padding={2}
      >
        <ProductCategoryTab />
      </Grid>
      <Grid container xs={12} height={500} justifyContent={"center"}>
        <Grid item xs={4} marginRight={5}>
          <img src={product.imageURL} alt="Product Image" height={400} width={"auto"} style={{maxWidth: 500}}/>
        </Grid>
        <Grid item xs={6}>
              <Grid>
              <Typography variant="h5" component="div" mb={3}>
                {product.name}
                <Button
                  sx={{ float: "right", borderRadius: 20 }}
                  variant="contained"
                >
                  available Quantity: {product.availableItems}
                </Button>
              </Typography>
              <Typography mb={3}>
                Category:{" "}
                <p style={{ display: "inline", fontWeight: "bold" }}>
                  {product.category}
                </p>
              </Typography>
              <Typography mb={3}>{product.description}</Typography>
              <Typography mb={3} variant="h5" color={"red"}>₹{product.price}</Typography>
              <TextField
                label="Enter Quantity"
                required
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                sx={{marginBottom: 3}} 
              />
              {/* <Link to="/orderdetails"> */}
              <Button variant="contained" sx={{display: "block"}} onClick={handleBuyClick} >Place Order</Button>
              {/* </Link> */}
              {/* <CreateOrder product={product} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
