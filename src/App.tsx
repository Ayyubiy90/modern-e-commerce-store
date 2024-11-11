// Import necessary libraries and components
import React, { useState } from "react"; // Import React and useState hook for managing state
import { Routes, Route, useLocation } from "react-router-dom"; // Import routing components from React Router
import { motion, AnimatePresence } from "framer-motion"; // Import animation components from Framer Motion
import { ShoppingBag, Search } from "lucide-react"; // Import icons from Lucide
import { ProductCard } from "./components/ProductCard"; // Import ProductCard component for displaying products
import { Cart } from "./components/Cart"; // Import Cart component for displaying the shopping cart
import { Success } from "./pages/Success"; // Import Success page for successful transactions
import { Cancel } from "./pages/Cancel"; // Import Cancel page for canceled transactions
import { products } from "./data/products"; // Import products data from a local file
import { useCartStore } from "./store/cartStore"; // Import custom hook for accessing cart state

// Define the Layout component
function Layout() {
  // State to manage the visibility of the cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State to manage the search query input by the user
  const [searchQuery, setSearchQuery] = useState("");
  // Access cart items from the cart store
  const cartItems = useCartStore((state) => state.items);

  // Filter products based on the search query (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section of the layout */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Store title */}
            <h1 className="text-2xl font-bold text-indigo-600">ModernStore</h1>

            <div className="flex items-center gap-6">
              {/* Search input for filtering products */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery} // Bind input value to searchQuery state
                  onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {/* Search icon positioned inside the input */}
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>

              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)} // Open cart on button click
                className="relative p-2 hover:bg-gray-100 rounded-full">
                {/* Shopping bag icon */}
                <ShoppingBag className="h-6 w-6" />
                {/* Display cart item count if there are items in the cart */}
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} // Initial scale for animation
                    animate={{ scale: 1 }} // Animate to scale 1 when items are added
                    className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}{" "}
                    {/* Display the number of items in the cart */}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content area for displaying products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map through filtered products and render a ProductCard for each */}
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> // Use product id as key for each card
          ))}
        </div>
      </main>

      {/* Cart Sidebar component, controlled by isCartOpen state */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

// Define the main App component
function App() {
  const location = useLocation; // Get the current location from the router to manage animations during route changes

  return (
    <AnimatePresence mode="wait">
      {" "}
      {/* AnimatePresence allows for exit animations on route changes */}
      <Routes location={location} key={location.pathname}>
        {" "}
        {/* Define routes based on the current location */}
        <Route path="/" element={<Layout />} />{" "}
        {/* Route for the main layout */}
        <Route path="/success" element={<Success />} />{" "}
        {/* Route for the success page */}
        <Route path="/cancel" element={<Cancel />} />{" "}
        {/* Route for the cancel page */}
      </Routes>
    </AnimatePresence>
  );
}

// Export the App component as the default export
export default App;
