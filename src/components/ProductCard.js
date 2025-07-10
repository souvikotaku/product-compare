import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';

const ProductCard = ({ product, isSelected, handleCompareToggle }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        width: '100%',
        border: isSelected ? '2px solid #1976d2' : 'none',
      }}
    >
      <CardMedia
        component='img'
        height='140'
        image={product.image}
        alt={product.name}
        coverage='contain'
        sx={{ objectFit: 'contain', padding: 1 }}
      />
      <CardContent>
        <Typography variant='h6'>{product.name}</Typography>
        <Typography variant='subtitle2' color='text.secondary'>
          {product.brand}
        </Typography>
        <Typography variant='body1' sx={{ mt: 1 }}>
          {product.price}
        </Typography>

        <ul style={{ paddingLeft: '1rem' }}>
          {product.features.map((feat, idx) => (
            <li key={idx}>
              <Typography variant='body2'>{feat}</Typography>
            </li>
          ))}
        </ul>

        <Box mt={2}>
          <Button
            variant={isSelected ? 'outlined' : 'contained'}
            color='primary'
            fullWidth
            onClick={() => handleCompareToggle(product)}
          >
            {isSelected ? 'Remove' : 'Add to Compare'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
