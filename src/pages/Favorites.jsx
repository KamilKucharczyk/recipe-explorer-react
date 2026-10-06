import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = (idMeal) => {
    removeFavorite(idMeal);
  };
  return (
    <div>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.idMeal}>
            Name: {favorite.strMeal}
            <Link to={`/recipes/${favorite.idMeal}`}>Meal details</Link>
            <button type="button" onClick={() => handleRemove(favorite.idMeal)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Favorites;
