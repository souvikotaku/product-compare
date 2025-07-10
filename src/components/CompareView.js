import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const CompareView = ({ selectedProducts, handleRemove }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (selectedProducts.length < 2) return null;

  const attributes = ['brand', 'price', 'features'];

  const isDifferent = (key) => {
    const values = selectedProducts.map((p) =>
      key === 'features' ? p[key].join(', ') : p[key]
    );
    return new Set(values).size > 1;
  };

  return (
    <Box mt={4}>
      <Typography variant='h5' gutterBottom>
        Comparison
      </Typography>

      <Grid container spacing={2}>
        {selectedProducts.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <Card
              sx={{
                backgroundColor: isDark ? '#121212' : '#f9f9f9',
                border: '1px solid #ccc',
                color: isDark ? '#fff' : '#000',
              }}
            >
              <CardContent>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h6'>{product.name}</Typography>
                  <IconButton
                    onClick={() => handleRemove(product.id)}
                    size='small'
                    sx={{ color: isDark ? '#fff' : '#000' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                {attributes.map((attr) => (
                  <Box
                    key={attr}
                    mt={1}
                    p={1}
                    sx={{
                      backgroundColor: isDifferent(attr)
                        ? isDark
                          ? '#331111'
                          : '#ffe0e0'
                        : 'transparent',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='subtitle2' color='text.secondary'>
                      {attr.charAt(0).toUpperCase() + attr.slice(1)}:
                    </Typography>
                    <Typography variant='body2'>
                      {attr === 'features' ? (
                        <ul style={{ paddingLeft: '1rem' }}>
                          {product.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      ) : (
                        product[attr]
                      )}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompareView;
