import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav>
        <NavLink
          to="/recipes"
          style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
        >
          Recipes
        </NavLink>
        <NavLink
          to="/favorites"
          style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
        >
          Favorites
        </NavLink>
        <NavLink
          to="/to-cook"
          style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
        >
          To cook
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
        >
          Profile
        </NavLink>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <Outlet />
    </div>
  );
};
export default Layout;
