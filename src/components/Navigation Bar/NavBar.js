import React from "react";
import {  ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Grid container spacing={0}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid item xs={0}>
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
            <Grid item textAlign={"end"} xs={8}>
              <Link to="/">
                <Button sx={{ color: "white", textDecoration: "underline" }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button sx={{ color: "white", textDecoration: "underline" }}>
                  Sign Up
                </Button>
              </Link>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    </Grid>
  );
};