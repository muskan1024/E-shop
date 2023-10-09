import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import ProductCategoryTab from "./ProductCategoryTab";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SearchOutlined, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("default");

  useEffect(() => {
    let url = "http://localhost:3001/api/v1/products";
    if (selectedCategory) {
      url += `?category=${selectedCategory}`;
    }
    if (selectedSort !== "default") {
      url += `&sort=${selectedSort}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [selectedCategory, selectedSort]);

  const sortProducts = (products, sortOption) => {
    switch (sortOption) {
      case "priceHighToLow":
        return [...products].sort((a, b) => b.price - a.price);
      case "priceLowToHigh":
        return [...products].sort((a, b) => a.price - b.price);
      case "newest":
        return [...products].sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      default:
        return products;
    }
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSortChange = (newSort) => {
    setSelectedSort(newSort);
  };

  const sortedProducts = sortProducts(products, selectedSort);

  return (
    <Grid container spacing={2} padding={2}>
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
              <SearchOutlined />
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  sx={{ background: "#66aee8bd", float: "right" }}
                  inputProps={{ style: { color: "white" } }}
                  label="Search"
                  variant="filled"
                  size="small"
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
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

      <Grid item xs={12} alignItems={"center"} justifyContent={"center"}>
        <ProductCategoryTab
          onCategoryChange={handleCategoryChange}
          // onSortChange={handleSortChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel>Sort by:</InputLabel>
          <Select
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
            <MenuItem value="priceLowToHigh">Price Low to High</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {sortedProducts.map((product) => (
        <Products key={product._id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsList;
