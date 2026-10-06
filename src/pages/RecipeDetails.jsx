import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import useToCook from "../hooks/useToCook";

const API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php";

const RecipeDetails = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addFavorite } = useFavorites();
  const { addToCook } = useToCook();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(`${API_URL}/?i=${id}`);
        if (!response.ok) {
          throw new Error("Fetch details failed");
        }
        const data = await response.json();
        setDetails(data.meals?.[0] || null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBack = () => {
    navigate(location.state?.from || "/recipes");
  };

  const handleAddToFavorites = () => {
    addFavorite(details);
  };

  const handleAddToCookList = () => {
    addToCook(details);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!details) {
    return <p>No details found</p>;
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = details[`strIngredient${i}`];
    const measure = details[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }
  return (
    <div>
      <h1>Recipe details</h1>
      <p>Name: {details.strMeal}</p>
      <p>
        Image: <img src={details.strMealThumb} alt={details.strMeal} />
      </p>
      <p>Category: {details.strCategory}</p>
      <p>Area: {details.strArea}</p>
      <p>Instruction: {details.strInstructions}</p>
      <p>Ingredients:</p>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleBack}>
        {" "}
        Back{" "}
      </button>
      <button type="button" onClick={handleAddToFavorites}>
        {" "}
        Add to favorites{" "}
      </button>
      <button type="button" onClick={handleAddToCookList}>
        {" "}
        Add to cook list{" "}
      </button>
    </div>
  );
};
export default RecipeDetails;
