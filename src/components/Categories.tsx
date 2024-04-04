interface CategoryState {
  selectedCategory: number;
  onChangeCategory: (n: number) => void;
}

function Categories(props: CategoryState) {
  const { selectedCategory, onChangeCategory } = props;
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
