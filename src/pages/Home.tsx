import { useContext, useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSorting, setSelectedSorting] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [selectedOrder, setSelectedOrder] = useState<"desc" | "asc">("desc");
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const { searchValue } = useContext(SearchContext);

  const pizzaSkeletons = [...new Array(6)].map((_, index) => (
    <Placeholder key={index} />
  ));
  const pizzas = items
    .filter((pizza) => {
      return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);

  function onChangeCategory(selectedCategory: number) {
    setSelectedPage(0);
    setSelectedCategory(selectedCategory);
  }

  useEffect(() => {
    const category =
      selectedCategory > 0 ? `&category=${selectedCategory}` : "";
    const sorting = selectedSorting.sortProperty;
    const pagination = `page=${selectedPage + 1}&limit=4`;

    setIsLoading(true);
    fetch(
      `https://660bdea73a0766e85dbcc139.mockapi.io/items?${pagination}&sortBy=${sorting}&order=${selectedOrder}${category}`
    )
      .then((data) => data.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [selectedCategory, selectedSorting, selectedOrder, selectedPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={onChangeCategory}
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
        {isLoading ? pizzaSkeletons : pizzas}
      </div>
      <Pagination
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </div>
  );
}

export default Home;
