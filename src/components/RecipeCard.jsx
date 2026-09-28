import { Link, useLocation } from "react-router-dom";

const RecipeCard = ({ pRecipe }) => {
  const location = useLocation();
  return (
    <div>
      <img src={pRecipe.strMealThumb} alt={pRecipe.strMeal} />
      <p>Name: {pRecipe.strMeal}</p>
      <p>Category: {pRecipe.strCategory}</p>
      <Link to={`/recipes/${pRecipe.idMeal}`} state={{ from: location }}>
        Recipe details
      </Link>
    </div>
  );
};
export default RecipeCard;
