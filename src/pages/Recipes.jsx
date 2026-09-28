import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const API_CATEGORY = "https://www.themealdb.com/api/json/v1/1/categories.php";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_CATEGORY);
        if (!response.ok) {
          throw new Error("Category fetch failed");
        }
        const dataCategory = await response.json();
        setCategories(dataCategory.categories || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.strMeal
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category ? recipe.strCategory === category : true;
    return matchesSearch && matchesCategory;
  });

  const sortedRecipes = [...filteredRecipes];

  if (sort === "A-Z") {
    sortedRecipes.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (sort === "Z-A") {
    sortedRecipes.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue) {
      setSearchParams({ search: searchValue, category, sort, page: 1 });
    } else {
      setSearchParams({ category, sort, page: 1 });
    }
  };

  const handleCategory = (e) => {
    const categoryValue = e.target.value;
    if (categoryValue) {
      setSearchParams({ category: categoryValue, search, sort, page: 1 });
    } else {
      setSearchParams({ search, sort, page: 1 });
    }
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    if (sortValue) {
      setSearchParams({ sort: sortValue, search, category, page: 1 });
    } else {
      setSearchParams({ search, category, page: 1 });
    }
  };

  const start = (page - 1) * 6;
  const totalPages = Math.ceil(sortedRecipes.length / 6);
  const paginatedRecipes = sortedRecipes.slice(start, start + 6);

  const handlePrev = () => {
    if (page > 1) {
      setSearchParams({ page: page - 1, search, category, sort });
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setSearchParams({ page: page + 1, search, category, sort });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Recipes</h1>
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearch}
        placeholder="search"
      />
      <select value={category} onChange={handleCategory}>
        <option value={""}>All</option>
        {categories.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
      <select value={sort} onChange={handleSort}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <ul>
        {paginatedRecipes.map((pRecipe) => (
          <li key={pRecipe.idMeal}>
            <RecipeCard pRecipe={pRecipe} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>
      <button
        type="button"
        onClick={handleNext}
        disabled={page === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
};
export default Recipes;
