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
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      appearance={{
        variables: {
          colorPrimary: "#e9710f",
          colorText: "#000000", 
          colorBackground: "#cfbfa0", 
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
