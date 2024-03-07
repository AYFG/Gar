import { signOut } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [err, setError] = useState(null);

  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = () => {
    setIsPending(true);
    signOut(appAuth)
      .then(() => {
        dispatch({ type: "logout" });
        setIsPending(false);
      })
      .catch((error) => {
        setError(error);
        setIsPending(false);
        console.error(err);
      });
  };

  return { err, isPending, logout };
};
