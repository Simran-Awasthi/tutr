import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  let navigate = useNavigate();
  const continueWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    if (res) {
      console.log(res.user);
      navigate("/");
    }
  };

  return (
    <div>
      <button onClick={continueWithGoogle}>Sign in with google</button>
    </div>
  );
};

export default Auth;
