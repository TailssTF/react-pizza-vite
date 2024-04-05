import { useContext, useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { observer } from "mobx-react-lite";
import { useStores } from "../Store-context";
import axios from "axios";

const Home = observer(() => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    FilterStore: {
      selectedCategory,
      selectedPage,
      selectedSorting,
      selectedOrder,
    },
  } = useStores();
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

  useEffect(() => {
    setIsLoading(true);
    axios.get(String(url)).then((res) => {
      if (Array.isArray(res.data)) {
        setItems(res.data);
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? pizzaSkeletons : pizzas}
      </div>
      <Pagination />
    </div>
  );
});

export default Home;
