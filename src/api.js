// src/api.js

// Base URL using DummyJSON free API for better product data
const BASE_URL = "https://dummyjson.com/products";

// Fetch all products (you can filter manually later if needed)
export async function getProducts() {
  try {
    const res = await fetch(BASE_URL);
    const result = await res.json();

    const data = result.products || [];

    // Optional: Filter products that match furniture/home decoration-like items
    const furnitureProducts = data.filter(product =>
      product.category.includes('furniture') ||
      product.category.includes('home') ||
      product.title.toLowerCase().includes('sofa') ||
      product.title.toLowerCase().includes('table') ||
      product.title.toLowerCase().includes('chair') ||
      product.title.toLowerCase().includes('lamp')
    );

    // If no furniture-like products, return all products as fallback
    return furnitureProducts.length > 0 ? furnitureProducts : data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch a single product by ID (optional, for detailed view or AR view)
export async function getProductById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
