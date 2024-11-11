// Import the loadStripe function from the Stripe.js library to handle Stripe integration
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key for authentication with Stripe services
export const stripePromise = loadStripe('pk_test_your_publishable_key');

// Asynchronous function to create a checkout session for the provided items
export async function createCheckoutSession(items: any[]) {
  // Wait for the Stripe object to be initialized
  const stripe = await stripePromise;
  
  // Check if Stripe was successfully initialized; throw an error if not
  if (!stripe) throw new Error('Stripe failed to initialize');

  // Map through the items array to create line items for the checkout session
  const lineItems = items.map((item) => ({
    // Define price data for each item
    price_data: {
      currency: 'usd', // Set the currency for the transaction
      product_data: {
        name: item.name, // Set the name of the product
        images: [item.image], // Set the image URL for the product
      },
      // Convert the price to cents (Stripe requires the amount in the smallest currency unit)
      unit_amount: Math.round(item.price * 100), // Price in cents
    },
    // Set the quantity of the item being purchased
    quantity: item.quantity,
  }));

  // Redirect to the Stripe checkout with the configured line items
  const { error } = await stripe.redirectToCheckout({
    mode: 'payment', // Set the mode to 'payment' for one-time payments
    lineItems, // Pass the line items created from the items array
    // URL to redirect to upon successful payment
    successUrl: `${window.location.origin}/success`, 
    // URL to redirect to if the payment is canceled
    cancelUrl: `${window.location.origin}/cart`,
  });

  // If there's an error during the checkout process, throw an error with the message
  if (error) {
    throw new Error(error.message);
  }
}