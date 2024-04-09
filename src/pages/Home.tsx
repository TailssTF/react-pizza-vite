import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../Store-context";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Pagination from "../components/Pagination";
import { IParameters } from "../stores/FilterStore";

const Home = observer(() => {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const {
    FilterStore: {
      selectedCategory,
      selectedPage,
      selectedSorting,
      selectedOrder,
      searchValue,
      setFilters,
    },
    PizzaStore: { items, state, fetchPizzas },
  } = useStores();

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

  const getPizzas = async () => {
    await fetchPizzas(url);
    window.scrollTo(0, 0);
  };

  // Применение параметров поисковой строки
  useEffect(() => {
    if (window.location.search) {
      const paramsQs = qs.parse(window.location.search.substring(1));
      const params: IParameters = {
        category: String(paramsQs.category),
        sortBy: String(paramsQs.sortBy),
        order: String(paramsQs.order),
        page: String(paramsQs.page),
      };

      setFilters(params);
      isSearch.current = true;
    }
  }, []);

  // Запись параметров в поисковую строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: selectedCategory,
        page: selectedPage,
        sortBy: selectedSorting.sortProperty,
        order: selectedOrder,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [
    selectedCategory,
    selectedSorting,
    selectedOrder,
    selectedPage,
    searchValue,
  ]);

  // Получение данных для пицц
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
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
      {state == "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению, не удалось получить пиццы. <br />
            Попробуйте повторить попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {state == "pending" ? pizzaSkeletons : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
});

export default Home;
