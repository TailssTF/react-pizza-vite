import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import "./App.css";
import "./scss/app.scss";

import pizzaLogoSvg from "./assets/img/pizza-logo.svg";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://660bdea73a0766e85dbcc139.mockapi.io/items")
      .then((data) => data.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="header">
        <div className="container">
          <div className="header__logo">
            <img width="38" src={pizzaLogoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
          <Header />
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((pizza) => (
              <PizzaBlock {...pizza} key={pizza.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
