import { useContext } from "react";
import { ToCookContext } from "../context/ToCookContext";

const useToCook = () => {
  const context = useContext(ToCookContext);
  if (!context) {
    throw new Error("usetoCook must be inside ToCookProvider");
  }
  return context;
};
export default useToCook;
