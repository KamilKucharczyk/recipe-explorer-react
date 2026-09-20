import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import ToCook from "./pages/ToCook";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="recipes" />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="recipes/:id" element={<RecipeDetails />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="to-cook" element={<ToCook />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
