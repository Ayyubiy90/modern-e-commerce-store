// Import necessary hooks and components
import { useEffect } from "react"; // Import useEffect for side effects
import { motion } from "framer-motion"; // Import motion for animations
import { CheckCircle, ArrowLeft } from "lucide-react"; // Import icons from lucide-react
import { Link } from "react-router-dom"; // Import Link for routing
import { useCartStore } from "../store/cartStore"; // Import the cart store for state management

// Define the Success component
export function Success() {
  // Get the clearCart function from the cart store
  const clearCart = useCartStore((state) => state.clearCart);

  // useEffect hook to clear the cart when the component mounts
  useEffect(() => {
    clearCart(); // Call the clearCart function to empty the cart
  }, [clearCart]); // Dependency array includes clearCart to avoid stale closures

  return (
    // Main container with minimum height, background color, and flexbox for centering
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Animated div for the main content */}
      <motion.div
        // Initial animation state: invisible and slightly moved down
        initial={{ opacity: 0, y: 20 }}
        // Animate to visible and original position
        animate={{ opacity: 1, y: 0 }}
        // Styling for the content box
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Animated div for the success icon */}
        <motion.div
          // Initial scale state: not visible
          initial={{ scale: 0 }}
          // Animate to full size
          animate={{ scale: 1 }}
          // Delay the scaling animation slightly
          transition={{ delay: 0.2 }}>
          {/* Icon indicating success, styled with size and color */}
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        </motion.div>
        {/* Title of the success message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        {/* Description of the successful payment */}
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We'll send you an email confirmation
          shortly.
        </p>
        {/* Link to return to the shop, styled with hover effect */}
        <Link
          to="/" // Route to navigate to when the link is clicked
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
          {/* Icon for the return link */}
          <ArrowLeft className="w-4 h-4" />
          {/* Text for the link */}
          Return to Shop
        </Link>
      </motion.div>
    </div>
  );
}
