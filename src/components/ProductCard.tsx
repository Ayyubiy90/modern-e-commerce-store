// Import necessary modules and components from libraries
import { motion } from "framer-motion"; // Animation library for React
import { ShoppingCart } from "lucide-react"; // Shopping cart icon component
import { Product } from "../types"; // Type definition for Product
import { useCartStore } from "../store/cartStore"; // Custom hook to manage cart state

// Define the props expected by the ProductCard component
interface ProductCardProps {
  product: Product; // Product object to be displayed in the card
}

// ProductCard component definition
export function ProductCard({ product }: ProductCardProps) {
  // Extract the addItem function from the cart store for adding items to the cart
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial state for entrance animation (invisible and slightly below)
      animate={{ opacity: 1, y: 0 }} // Animate to visible state (fully opaque and in place)
      whileHover={{ y: -5 }} // Slight upward movement on hover
      className="bg-white rounded-lg shadow-lg overflow-hidden" // Styles for the card
    >
      {/* Container for the product image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image} // Image source from the product object
          alt={product.name} // Alt text for accessibility
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" // Styles for the image with scaling effect on hover
        />
      </div>
      {/* Container for product details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>{" "}
        {/* Product name */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>{" "}
        {/* Product description with line clamping to limit text display */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}{" "}
            {/* Display product price formatted to two decimal places */}
          </span>
          {/* Button to add the product to the cart */}
          <button
            onClick={() => addItem(product)} // Call addItem function with the current product when clicked
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors" // Styles for the button
          >
            <ShoppingCart size={20} /> {/* Shopping cart icon */}
            Add to Cart {/* Button text */}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
