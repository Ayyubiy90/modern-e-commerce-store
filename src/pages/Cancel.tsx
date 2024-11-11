// Import necessary components and libraries
import { motion } from "framer-motion"; // Import motion for animations
import { XCircle, ArrowLeft } from "lucide-react"; // Import icons from lucide-react
import { Link } from "react-router-dom"; // Import Link for routing

// Define the Cancel component
export function Cancel() {
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
        {/* Animated div for the icon */}
        <motion.div
          // Initial scale state: not visible
          initial={{ scale: 0 }}
          // Animate to full size
          animate={{ scale: 1 }}
          // Delay the scaling animation slightly
          transition={{ delay: 0.2 }}>
          {/* Icon indicating cancellation, styled with size and color */}
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        </motion.div>
        {/* Title of the cancellation message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        {/* Description of the cancellation status */}
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges were made to your account.
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
