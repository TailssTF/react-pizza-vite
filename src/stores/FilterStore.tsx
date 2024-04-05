import { makeAutoObservable } from "mobx";

class FilterStore {
  selectedCategory = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedCategory = (category: number) => {
    this.selectedCategory = category;
  };
}

export default new FilterStore();
