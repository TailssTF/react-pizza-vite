import { useState } from "react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategory = (index: number) => {
    setSelectedCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name: string, index: number) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={selectedCategory == index ? "active" : ""}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
