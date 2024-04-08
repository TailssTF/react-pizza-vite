import { makeAutoObservable } from "mobx";

export interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

class CartStore {
  totalPrice: number = 0;
  items: Pizza[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem = (item: Pizza) => {
    this.items.push(item);
  };

  removeItem = (item: Pizza) => {
    this.items.filter((obj) => obj.id !== item.id);
  };

  clearCart = () => {
    this.items = [];
  };
}

export default new CartStore();
