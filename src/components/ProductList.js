import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, selected, handleCompareToggle }) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={product.id}
          className='product-card'
        >
          <ProductCard
            product={product}
            isSelected={selected.some((p) => p.id === product.id)}
            handleCompareToggle={handleCompareToggle}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
