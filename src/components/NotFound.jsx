import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleClick = () => {
    isLoggedIn ? navigate("/recipes") : navigate("/login");
  };

  return (
    <div>
      <h1>404 - Page not found</h1>
      <button type="button" onClick={handleClick}>
        Go back
      </button>
    </div>
  );
};
export default NotFound;
