import { createContext, useEffect, useState } from "react";

export const ToCookContext = createContext();

const ToCookProvider = ({ children }) => {
  const initialToCook = localStorage.getItem("toCook") || "";
  const [toCook, setToCook] = useState(
    initialToCook ? JSON.parse(initialToCook) : [],
  );

  const addToCook = (recipe) => {
    const existedRecipe = toCook.some((item) => item.idMeal === recipe.idMeal);
    if (!existedRecipe) {
      const newToCookBase = [...toCook, { ...recipe, done: false }];
      setToCook(newToCookBase);
    }
  };

  const removeFromToCook = (idMeal) => {
    const filteredToCook = toCook.filter((item) => idMeal !== item.idMeal);
    setToCook(filteredToCook);
  };

  const markAsDone = (idMeal) => {
    setToCook((toCook) =>
      toCook.map((recipe) =>
        recipe.idMeal === idMeal ? { ...recipe, done: !recipe.done } : recipe,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("toCook", JSON.stringify(toCook));
  }, [toCook]);

  return (
    <ToCookContext.Provider
      value={{ toCook, addToCook, removeFromToCook, markAsDone }}
    >
      {children}
    </ToCookContext.Provider>
  );
};
export default ToCookProvider;
