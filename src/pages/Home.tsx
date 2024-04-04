import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Placeholder from "../components/PizzaBlock/Placeholder";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSorting, setSelectedSorting] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://660bdea73a0766e85dbcc139.mockapi.io/items?category=" +
        selectedCategory
    )
      .then((data) => data.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [selectedCategory]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Placeholder key={index} />)
          : items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </div>
  );
}

export default Home;
