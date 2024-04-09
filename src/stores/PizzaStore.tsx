import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IPizza } from "../components/PizzaBlock";

class PizzaStore {
  items: IPizza[] = [];
  state = "pedning";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setItems = (items: IPizza[]) => {
    this.items = items;
  };

  *fetchPizzas(url: URL) {
    this.items = [];
    this.state = "pending";

    try {
      const { data } = yield axios.get(String(url));
      this.state = "done";
      this.items = data;
    } catch (error) {
      this.state = "error";
      alert("Ошибка при получении данных");
    }
  }
}

export default new PizzaStore();
