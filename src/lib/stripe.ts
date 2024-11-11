// Import the loadStripe function from the Stripe.js library to handle Stripe integration
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe publishable key from the environment variable
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Initialize Stripe with the publishable key
export const stripePromise = loadStripe(stripePublishableKey);

// Asynchronous function to create a checkout session for the provided items
export async function createCheckoutSession(items: any[]) {
  const stripe = await stripePromise;

  if (!stripe) throw new Error('Stripe failed to initialize');

  // Check if items array is empty
  if (items.length === 0) {
    throw new Error('No items to checkout');
  }

  // Map through the items array to create line items for the checkout session
  const line_items = items.map((item) => {
    // Ensure item has the required properties
    if (!item.name || !item.price || !item.image || !item.quantity) {
      throw new Error('Item is missing required properties');
    }

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convert dollars to cents
      },
      quantity: item.quantity || 1, // Default to 1 if quantity is not defined
    };
  });

  // Log line_items to debug
  console.log("Line items before checkout:", JSON.stringify(line_items, null, 2));

  // Redirect to the Stripe checkout with the configured line items
  const { error } = await stripe.redirectToCheckout({
    mode: 'payment',
    line_items: line_items, // Use line_items with an underscore
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cart`,
  });

  // If there's an error during the checkout process, throw an error with the message
  if (error) {
    console.error("Error during checkout:", error);
    throw new Error(error.message);
  }
}