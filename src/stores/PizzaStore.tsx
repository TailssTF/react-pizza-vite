import { makeAutoObservable } from "mobx";
import { IPizza } from "../components/PizzaBlock";

class PizzaStore {
  items: IPizza[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setItems = (items: IPizza[]) => {
    this.items = items;
  };
}

export default new PizzaStore();
