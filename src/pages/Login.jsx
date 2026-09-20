import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginForm from "./LoginForm";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    login();
    navigate("/recipes");
  };
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};
export default Login;
