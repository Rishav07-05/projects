
import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";




import { useUser } from "@clerk/clerk-react";
import { useRef,  useEffect } from "react";
import toast from "react-hot-toast";
import Compiler from "./components/Compiler";




const Dashboard = () => {

const shownToast = useRef(false);
    
 const { isSignedIn, user } = useUser();

useEffect(() => {
  if (isSignedIn && !shownToast.current) {
    toast.success(`Welcome ${user?.firstName || "back"}!`, {
      id: "login-toast",
    });
    shownToast.current = true;
  }
}, [isSignedIn, user]);




  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        
        <Compiler />
              
      </SignedIn>
    </>
  );
};

export default Dashboard;
