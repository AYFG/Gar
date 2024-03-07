import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timeStamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "addDoc":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "error":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "isPending":
      return { isPending: true, document: null, success: false, error: null };
    case "deleteDoc":
      return { isPending: false, document: null, success: true, error: null };
    case "updateDoc":
      return { isPending: false, document: null, success: true, error: null };
      return;
    default:
      return state;
  }
};

export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  const colRef = collection(appFireStore, transaction);

  const addDocument = async (doc) => {
    try {
      const createdTime = timeStamp.fromDate(new Date());
      const date = new Date(createdTime.seconds * 1000);
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };
  const updateDocument = async (id, updateData) => {
    try {
      const docRef = doc(colRef, id);
      await updateDoc(docRef, updateData);
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  return { addDocument, deleteDocument, response, updateDocument };
};
