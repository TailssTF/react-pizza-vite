import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import "./App.css";
import "./scss/app.scss";

import pizzaLogoSvg from "./assets/img/pizza-logo.svg";
import pizzas from "./assets/pizzas.json";

function App() {
  return (
    <>
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
              {pizzas.map((pizza) => (
                <PizzaBlock
                  title={pizza.title}
                  price={pizza.price}
                  imageUrl={pizza.imageUrl}
                  sizes={pizza.sizes}
                  types={pizza.types}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
