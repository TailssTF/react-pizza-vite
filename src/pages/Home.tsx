import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Placeholder from "../components/PizzaBlock/Placeholder";

function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSorting, setSelectedSorting] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [selectedOrder, setSelectedOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    const category =
      selectedCategory > 0 ? `&category=${selectedCategory}` : "";
    const sorting = selectedSorting.sortProperty;

    setIsLoading(true);
    fetch(
      `https://660bdea73a0766e85dbcc139.mockapi.io/items?sortBy=${sorting}&order=${selectedOrder}${category}`
    )
      .then((data) => data.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [selectedCategory, selectedSorting, selectedOrder]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Sort
          selectedSorting={selectedSorting}
          setSelectedSorting={setSelectedSorting}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
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
