import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  Container,
  Typography,
  TextField,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ProductList from './components/ProductList';
import CompareView from './components/CompareView';
import products from './data/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STORAGE_KEYS = {
  COMPARE_LIST: 'compareList',
  DARK_MODE: 'darkMode',
};

function App() {
  const [compareList, setCompareList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const compareRef = useRef(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedCompareList = localStorage.getItem(STORAGE_KEYS.COMPARE_LIST);
    const savedDarkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);

    if (savedCompareList) {
      try {
        const parsedList = JSON.parse(savedCompareList);
        setCompareList(parsedList);

        // If we have 2+ items, we'll need to scroll after the initial render
        if (parsedList.length >= 2) {
          setTimeout(() => {
            if (compareRef.current) {
              compareRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300);
        }
      } catch (error) {
        console.error('Failed to parse compare list from localStorage', error);
      }
    }

    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }

    setIsInitialLoad(false);
  }, []);

  // Save compareList to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem(
        STORAGE_KEYS.COMPARE_LIST,
        JSON.stringify(compareList)
      );
    }
  }, [compareList, isInitialLoad]);

  // Save darkMode to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, darkMode.toString());
    }
  }, [darkMode, isInitialLoad]);

  const handleCompareToggle = (product) => {
    const exists = compareList.some((p) => p.id === product.id);

    if (exists) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        toast.error('Maximum three products can be compared at a time');
        return;
      }

      const newList = [...compareList, product];
      setCompareList(newList);

      if (newList.length === 1) {
        toast.info('Please add more than 1 product to show compare section');
      }

      if (newList.length === 2 && compareRef.current) {
        setTimeout(() => {
          compareRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  };

  const handleRemove = (id) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ mt: 4, mb: 4 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
            />
          }
          label={darkMode ? 'Dark Mode' : 'Light Mode'}
          sx={{ mb: 2 }}
        />

        <Typography variant='h4' gutterBottom align='center'>
          Product Comparison Tool
        </Typography>

        <TextField
          fullWidth
          variant='outlined'
          placeholder='Search by name or brand...'
          sx={{ mb: 3 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <ProductList
          products={filteredProducts}
          selected={compareList}
          handleCompareToggle={handleCompareToggle}
        />

        <ToastContainer position='top-right' autoClose={3000} />

        <div ref={compareRef}>
          <CompareView
            selectedProducts={compareList}
            handleRemove={handleRemove}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
