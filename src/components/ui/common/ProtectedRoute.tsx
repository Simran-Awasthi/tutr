import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const checkUser = () => {
    setIsLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/auth");
      }
      setIsLoading(false);
    });

    return unSubscribe;
  };
  useEffect(() => {
    const unSubscribe = checkUser();
    return unSubscribe;
  }, []);
  return isLoading ? <div>tutr</div> : children;
};

export default ProtectedRoute;
