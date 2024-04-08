import { useState } from "react";

import { Pizza } from "../../stores/CartStore";

interface TypeNames {
  [keyof: number]: string;
}

function PizzaBlock(props: Pizza) {
  const { title, price, imageUrl, sizes, types } = props;
  const [pizzaCount, setPizzaCount] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);

  const pizzaType: TypeNames = {
    0: "тонкое",
    1: "традиционное",
  };

  const onPizzaAdd = () => {
    setPizzaCount(pizzaCount + 1);
  };

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                className={selectedType == type ? "active" : ""}
                onClick={() => setSelectedType(type)}
              >
                {pizzaType[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                className={selectedSize == index ? "active" : ""}
                onClick={() => setSelectedSize(index)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {String(price)} ₽</div>
          <button
            onClick={onPizzaAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{pizzaCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
