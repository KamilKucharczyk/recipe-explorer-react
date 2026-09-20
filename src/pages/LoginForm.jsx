import useForm from "../hooks/useForm";

const LoginForm = ({ onSubmit }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.login) {
      errors.login = "Login is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 10) {
      errors.password = "At least 10 characters";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    { login: "", password: "" },
    validate,
    onSubmit,
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          value={values.login}
          onChange={handleChange}
          placeholder="login"
        />
        {errors.login && <p>{errors.login}</p>}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="password"
        />
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
