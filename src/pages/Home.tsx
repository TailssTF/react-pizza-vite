import { useContext, useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import FilterStore from "../stores/FilterStore";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { selectedCategory, setSelectedCategory } = FilterStore;
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
  const pizzas =
    items.length > 0
      ? items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)
      : [];

  const url = new URL("https://660bdea73a0766e85dbcc139.mockapi.io/items");
  if (selectedCategory > 0) {
    url.searchParams.append("category", `${selectedCategory}`);
  }
  url.searchParams.append("page", `${selectedPage + 1}`);
  url.searchParams.append("limit", "4");
  url.searchParams.append("sortBy", selectedSorting.sortProperty);
  url.searchParams.append("order", selectedOrder);
  if (searchValue) {
    url.searchParams.append("search", searchValue);
  }

  function onChangeCategory(selectedCategory: number) {
    setSelectedPage(0);
    setSelectedCategory(selectedCategory);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((data) => data.json())
      .then((arr) => {
        if (Array.isArray(arr)) {
          setItems(arr);
        } else {
          setItems([]);
        }
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [
    selectedCategory,
    selectedSorting,
    selectedOrder,
    selectedPage,
    searchValue,
  ]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
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
});

export default Home;
