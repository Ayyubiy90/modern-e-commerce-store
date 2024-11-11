// Define an interface named Product to represent the structure of a product object
export interface Product {
    // Unique identifier for the product
    id: number;
    // Name of the product
    name: string;
    // Price of the product in numerical format
    price: number;
    // Description providing details about the product
    description: string;
    // URL or path to the product's image
    image: string;
    // Category to which the product belongs (e.g., electronics, clothing, etc.)
    category: string;
  }
  
  // Define an interface named CartItem that extends the Product interface
  // This interface represents an item in the shopping cart, which includes additional properties
  export interface CartItem extends Product {
    // Quantity of the product added to the cart
    quantity: number;
  }