import { makeAutoObservable } from "mobx";

export interface IPizzaInCart {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  selectedSize: number;
  selectedType: number;
  count?: number;
}

class CartStore {
  totalPrice: number = 0;
  totalItems: number = 0;
  items: IPizzaInCart[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem = (item: IPizzaInCart) => {
    const findItem = this.items.find(
      (obj: IPizzaInCart) =>
        //   this.isEqualPizza(obj, item)
        obj.id == item.id
    );

    if (findItem && findItem.count) {
      findItem.count++;
    } else {
      this.items.push({ ...item, count: 1 });
    }
    this.totalPrice = this.items.reduce((sum, obj) => {
      return obj.count ? obj.price * obj.count + sum : obj.price + sum;
    }, 0);
    this.totalItems = this.items.reduce((sum, obj) => {
      return obj.count ? obj.count + sum : sum++;
    }, 0);
  };

  removeItem = (item: IPizzaInCart) => {
    this.items.filter((obj) => obj.id !== item.id);
  };

  clearCart = () => {
    this.items = [];
  };

  isEqualPizza = (pizza1: IPizzaInCart, pizza2: IPizzaInCart) => {
    return (
      pizza1.id == pizza2.id &&
      pizza1.selectedType == pizza2.selectedType &&
      pizza1.selectedSize == pizza2.selectedSize
    );
  };
}

export default new CartStore();
