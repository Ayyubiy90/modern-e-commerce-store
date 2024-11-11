// Import necessary modules and components from libraries
import { motion, AnimatePresence } from "framer-motion"; // Animation library for React
import { X, ShoppingBag, Trash2 } from "lucide-react"; // Icon components for UI
import { useCartStore } from "../store/cartStore"; // Custom hook to manage cart state
import { createCheckoutSession } from "../lib/stripe"; // Function to create a checkout session with Stripe

// Define the props expected by the Cart component
interface CartProps {
  isOpen: boolean; // Indicates if the cart is open or closed
  onClose: () => void; // Function to close the cart
}

// Cart component definition
export function Cart({ isOpen, onClose }: CartProps) {
  // Destructure cart store state and actions from the custom hook
  const { items, total, removeItem, updateQuantity } = useCartStore();

  // Function to handle the checkout process
  const handleCheckout = async () => {
    try {
      // Attempt to create a checkout session with the current items in the cart
      await createCheckoutSession(items);
    } catch (error) {
      // Log any errors that occur during the checkout process
      console.error("Error during checkout:", error);
      // Notify the user of the error
      alert(
        "Something went wrong with the checkout process. Please try again."
      );
    }
  };

  return (
    <AnimatePresence>
      {/* Render the cart only if it is open */}
      {isOpen && (
        <>
          {/* Overlay background that dims the rest of the screen */}
          <motion.div
            initial={{ opacity: 0 }} // Initial opacity for entrance animation
            animate={{ opacity: 0.5 }} // Target opacity during animation
            exit={{ opacity: 0 }} // Exit animation to fade out
            onClick={onClose} // Close cart when clicking on the overlay
            className="fixed inset-0 bg-black z-40" // Styles for the overlay
          />
          {/* Cart container that slides in from the right */}
          <motion.div
            initial={{ x: "100%" }} // Start off-screen to the right
            animate={{ x: 0 }} // Animate to the original position
            exit={{ x: "100%" }} // Exit animation to slide out to the right
            transition={{ type: "spring", damping: 20 }} // Spring transition for smoothness
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-hidden flex flex-col" // Styles for the cart
          >
            {/* Header section of the cart */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                {/* Title and icon for the cart */}
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" /> {/* Shopping bag icon */}
                  <h2 className="text-xl font-semibold">Your Cart</h2>{" "}
                  {/* Cart title */}
                </div>
                {/* Button to close the cart */}
                <button
                  onClick={onClose} // Close cart when clicked
                  className="p-2 hover:bg-gray-100 rounded-full" // Styles for the button
                >
                  <X className="h-6 w-6" /> {/* Close icon */}
                </button>
              </div>
            </div>

            {/* Main content area of the cart */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Check if there are no items in the cart */}
              {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  Your cart is empty {/* Message for empty cart */}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Map through items in the cart and display them */}
                  {items.map((item) => (
                    <motion.div
                      key={item.id} // Unique key for each item
                      layout // Enables layout animations
                      initial={{ opacity: 0, y: 20 }} // Initial state for entrance animation
                      animate={{ opacity: 1, y: 0 }} // Animate to visible state
                      exit={{ opacity: 0, y: -20 }} // Exit animation for items
                      className="flex gap-4" // Flex container for item layout
                    >
                      {/* Image of the cart item */}
                      <img
                        src={item.image} // Image source
                        alt={item.name} // Alt text for accessibility
                        className="w-24 h-24 object-cover rounded-lg" // Styles for the image
                      />
                      <div className="flex-1">
                        {/* Item name */}
                        <h3 className="font-semibold">{item.name}</h3>{" "}
                        {/* Display item name */}
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)}{" "}
                          {/* Display item price formatted to two decimal places */}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {/* Dropdown to select item quantity */}
                          <select
                            value={item.quantity} // Current quantity selected
                            onChange={
                              (e) =>
                                updateQuantity(item.id, Number(e.target.value)) // Update quantity on change
                            }
                            className="border rounded px-2 py-1" // Styles for the dropdown
                          >
                            {/* Options for quantity selection */}
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num} {/* Display quantity option */}
                              </option>
                            ))}
                          </select>
                          {/* Button to remove item from cart */}
                          <button
                            onClick={() => removeItem(item.id)} // Remove item when clicked
                            className="p-1 hover:bg-red-100 rounded-full text-red-600" // Styles for the button
                          >
                            <Trash2 className="h-5 w-5" />{" "}
                            {/* Trash icon for removal */}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer section with total price and checkout button */}
            <div className="border-t p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total</span>{" "}
                {/* Label for total price */}
                <span className="text-2xl font-bold">
                  ${total.toFixed(2)}
                </span>{" "}
                {/* Display total price formatted to two decimal places */}
              </div>
              {/* Button to proceed to checkout */}
              <button
                onClick={handleCheckout} // Handle checkout when clicked
                disabled={items.length === 0} // Disable button if cart is empty
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" // Styles for the button
              >
                Proceed to Checkout {/* Button text */}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
