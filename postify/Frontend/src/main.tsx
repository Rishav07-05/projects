import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        variables: {
          colorPrimary: "#e9710f",
          colorText: "#000000", // You want readable black text on #cfbfa0
          colorBackground: "#cfbfa0", // This will apply to some elements
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
