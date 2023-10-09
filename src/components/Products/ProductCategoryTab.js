import React, { useEffect, useState } from "react";
import axios from "axios";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FormControl, Grid, InputLabel, Menu, MenuItem, Select } from "@mui/material";

const ProductCategoryTab = ({ onCategoryChange, onSortChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("default");

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
    if (onCategoryChange) {
      onCategoryChange(newCategory);
    }
  };

  const handleSortChange = (event, newSort) => {
    setSelectedSort(newSort);
    if (onSortChange) {
      onSortChange(newSort);
    }
  };

  return (
    <Grid container spacing={2} direction={"column"} alignItems={"center"}>
      <Grid item xs={12} >
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="Category"
        >
          <ToggleButton>All</ToggleButton>
          {categories.map((category) => (
            <ToggleButton key={category} value={category}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      </Grid>
  );
};

export default ProductCategoryTab;