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
      await createCheckoutSession(items);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(
        "Something went wrong with the checkout process. Please try again."
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background that dims the rest of the screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          {/* Cart container that slides in from the right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-hidden flex flex-col">
            {/* Header section of the cart */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Your Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Main content area of the cart */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, Number(e.target.value))
                            }
                            className="border rounded px-2 py-1">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:bg-red-100 rounded-full text-red-600">
                            <Trash2 className="h-5 w-5" />
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
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
