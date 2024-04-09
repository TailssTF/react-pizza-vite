import { useState } from "react";

import { observer } from "mobx-react-lite";
import { useStores } from "../../Store-context";

import { pizzaType } from "../../stores/CartStore";

export interface IPizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

const PizzaBlock = observer((pizza: IPizza) => {
  const { id, title, price, imageUrl, sizes, types } = pizza;
  const {
    CartStore: { items, addItem },
  } = useStores();
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const cartItem = items.find((obj) => obj.id == id);

  const onAddPizza = () => {
    addItem({ id, title, price, imageUrl, selectedSize, selectedType });
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
            onClick={onAddPizza}
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
            {cartItem?.count && <i>{cartItem.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
});

export default PizzaBlock;
