// Import the create function from Zustand for state management
import { create } from 'zustand';
// Import types for CartItem and Product from the types module
import { CartItem, Product } from '../types';

// Define the interface for the cart store
interface CartStore {
  items: CartItem[]; // Array of items in the cart
  addItem: (product: Product) => void; // Function to add an item to the cart
  removeItem: (productId: number) => void; // Function to remove an item from the cart
  updateQuantity: (productId: number, quantity: number) => void; // Function to update the quantity of an item
  clearCart: () => void; // Function to clear the cart
  total: number; // Total price of items in the cart
}

// Create the cart store using Zustand
export const useCartStore = create<CartStore>((set, get) => ({
  items: [], // Initialize items as an empty array
  total: 0, // Initialize total as 0
  // Function to add an item to the cart
  addItem: (product) => {
    set((state) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        // If it exists, increment the quantity and update the total
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // Increment quantity
              : item // Keep other items unchanged
          ),
          total: state.total + product.price, // Update total price
        };
      }
      // If it doesn't exist, add the new item with quantity 1
      return {
        items: [...state.items, { ...product, quantity: 1 }], // Add new item
        total: state.total + product.price, // Update total price
      };
    });
  },
  // Function to remove an item from the cart
  removeItem: (productId) => {
    set((state) => {
      // Find the item to be removed
      const item = state.items.find((i) => i.id === productId);
      return {
        items: state.items.filter((i) => i.id !== productId), // Filter out the removed item
        total: state.total - (item ? item.price * item.quantity : 0), // Update total price
      };
    });
  },
  // Function to update the quantity of an item in the cart
  updateQuantity: (productId, quantity) => {
    set((state) => {
      // Find the item to update
      const item = state.items.find((i) => i.id === productId);
      if (!item) return state; // If item doesn't exist, return current state
      
      // Calculate the difference in quantity
      const quantityDiff = quantity - item.quantity;
      return {
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item // Update quantity for the specified item
        ),
        total: state.total + item.price * quantityDiff, // Update total price based on quantity difference
      };
    });
  },
  // Function to clear the cart
  clearCart: () => set({ items: [], total: 0 }), // Reset items and total to initial state
}));