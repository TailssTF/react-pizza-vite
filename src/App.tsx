import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import "./App.css";
import "./scss/app.scss";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="container">
            <div className="header__logo">
              <img width="38" src="./img/pizza-logo.svg" alt="Pizza logo" />
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
              <PizzaBlock title="Мексиканская" price={500} />
              <PizzaBlock title="Мясная" price={400} />
              <PizzaBlock title="Вегетарианская" price={450} />
              <PizzaBlock title="Гавайская" price={350} />
              <PizzaBlock title="Пепперони" price={300} />
              <PizzaBlock title="Охотничья" price={400} />
              <PizzaBlock title="Четыре сыра" price={350} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
