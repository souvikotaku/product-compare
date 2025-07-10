# Product Comparison Tool

## Overview
The Product Comparison Tool is a React-based web application that allows users to compare up to three products based on attributes like name, brand, price, and features. It features a responsive design, dark/light mode toggle, search functionality, and persistent comparison data saved in the browser's local storage.

## Features
- Add up to three products to a comparison list.
- View detailed comparisons with highlighted differences.
- Search products by name or brand.
- Toggle between dark and light themes.
- Persistent comparison data across page refreshes.
- Toast notifications for user feedback (e.g., maximum limit reached).

## Installation

### Prerequisites
Ensure you have Node.js installed on your system.

### Steps
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd product-compare-app

2. **Install Dependencies. Ensure you have Node.js installed. Then run:**
   ```bash
   npm install

3. **Run the Application. Start the development server with:**
   ```bash
   npm start
Open http://localhost:3000 in your browser to view the app.

## Usage

### Launch the App
- Open the app in your browser after starting the development server.

### Explore Products
- A list of products will be displayed. Each product card shows the name, brand, price, and features.

### Add Products to Compare
- Click the "Add to Compare" button on a product card to add it to the comparison list.
- A maximum of three products can be compared at a time. An error toast will appear if the limit is reached.

### View Comparison
- Once two or more products are added, the comparison section will appear below the product list.
- Scroll to the comparison view automatically when adding the second product.
- Differences in attributes (e.g., price, features) are highlighted.

### Remove Products
- Click the "Remove" button (trash icon) next to a product in the comparison view to remove it from the list.

### Search Products
- Use the search bar at the top to filter products by name or brand.

### Toggle Theme
- Switch between dark and light modes using the toggle switch above the product list.

### Persistence
- The comparison list persists across page refreshes thanks to local storage. Add products, refresh the page, and they will remain in the comparison list.

## Dependencies

- React

- Material-UI (MUI) for components

- React Toastify for notifications
