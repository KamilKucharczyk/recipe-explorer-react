import useForm from "../hooks/useForm";

const Profile = () => {
  const savedProfile = localStorage.getItem("profile");
  const initialValues = savedProfile
    ? JSON.parse(savedProfile)
    : { username: "", email: "", favoriteCuisine: "" };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!values.email.includes("@")) {
      errors.email = "@ is missing";
    }
    if (!values.favoriteCuisine) {
      errors.favoriteCuisine = "Favorite cuisine is required";
    }
    return errors;
  };

  const onSubmit = (values) => {
    localStorage.setItem("profile", JSON.stringify(values));
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit,
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="username"
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="email"
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="text"
          name="favoriteCuisine"
          value={values.favoriteCuisine}
          onChange={handleChange}
          placeholder="favorite cuisine"
        />
        {errors.favoriteCuisine && <p>{errors.favoriteCuisine}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Profile;
