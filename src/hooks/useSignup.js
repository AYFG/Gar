import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const [error, setError] = useState(null);

  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        if (!user) {
          throw new Error("회원 정보를 불러올 수 없습니다.");
        }
        updateProfile(appAuth.currentUser, { displayName })
          .then(() => {
            dispatch({ type: "login", payload: user });
            setError(null);
            setIsPending(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsPending(false);
            console.error(error);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
        console.error(error);
      });
  };

  return { error, isPending, signup };
};
