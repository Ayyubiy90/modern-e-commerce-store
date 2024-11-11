// Import the StrictMode component from React for highlighting potential problems in an application
import { StrictMode } from "react";
// Import the createRoot method from the ReactDOM client to create a root for rendering
import { createRoot } from "react-dom/client";
// Import the BrowserRouter from react-router-dom for handling routing in the application
import { BrowserRouter } from "react-router-dom";
// Import the main App component which serves as the entry point of the application
import App from "./App.tsx";
// Import the global CSS styles for the application
import "./index.css";

// Create a root element for rendering the React application
// The '!' after getElementById indicates that we are confident that the element exists
createRoot(document.getElementById("root")!).render(
  // Wrap the application in StrictMode to enable additional checks and warnings
  <StrictMode>
    {/* Wrap the App component in BrowserRouter to enable routing functionality */}
    <BrowserRouter>
      {/* Render the main App component */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
