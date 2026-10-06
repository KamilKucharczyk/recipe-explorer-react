import useToCook from "../hooks/useToCook";

const ToCook = () => {
  const { toCook, removeFromToCook, markAsDone } = useToCook();
  const handleRemove = (idMeal) => {
    removeFromToCook(idMeal);
  };

  const allItems = toCook.length;
  const doneItems = toCook.filter((item) => item.done).length;
  const notDoneItems = allItems - doneItems;

  return (
    <div>
      <ul>
        {toCook.map((item) => (
          <li key={item.idMeal}>
            Name: {item.strMeal}
            <button type="button" onClick={() => markAsDone(item.idMeal)}>
              {item.done ? "Mark as not done" : "Mark as done"}
            </button>
            <button type="button" onClick={() => handleRemove(item.idMeal)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>All recipes: {allItems}</p>
      <p>Done recipes: {doneItems}</p>
      <p>Not done yet: {notDoneItems}</p>
    </div>
  );
};
export default ToCook;
