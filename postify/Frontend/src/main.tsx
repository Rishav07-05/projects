import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";


const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={clerkPubKey}
        appearance={{
          variables: {
            colorPrimary: "#e9710f",
            colorText: "#000000", // You want readable black text on #cfbfa0
            colorBackground: "#cfbfa0", // This will apply to some elements
            colorInputBackground: "#2a2a2a",
          },
          elements: {
            userButtonPopoverCard: {
              backgroundColor: "#cfbfa0", // This is the dropdown card
              color: "#000000",
            },
            
            
            userButtonBox: {
              backgroundColor: "#cfbfa0", // Avatar background if needed
              borderRadius: "8px",
            },
          },
        }}
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
