import { observer } from "mobx-react-lite";
import { useStores } from "../Store-context";

const Categories: React.FC = observer(() => {
  const {
    FilterStore: { selectedCategory, setSelectedCategory },
  } = useStores();
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((name: string, index: number) => (
          <li
            key={index}
            onClick={() => setSelectedCategory(index)}
            className={selectedCategory == index ? "active" : ""}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
