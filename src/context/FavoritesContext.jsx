import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const initialFavorites = localStorage.getItem("favorites") || "";
  const [favorites, setFavorites] = useState(
    initialFavorites ? JSON.parse(initialFavorites) : [],
  );

  const addFavorite = (recipe) => {
    const existiedRecipe = favorites.some(
      (item) => item.idMeal === recipe.idMeal,
    );
    if (!existiedRecipe) {
      const newFavorites = [...favorites, recipe];
      setFavorites(newFavorites);
    }
  };

  const removeFavorite = (idMeal) => {
    const filteredFavorites = favorites.filter(
      (item) => idMeal !== item.idMeal,
    );
    setFavorites(filteredFavorites);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
