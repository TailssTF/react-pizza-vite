import { makeAutoObservable } from "mobx";

class FilterStore {
  selectedCategory = 0;
  selectedPage = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedCategory = (category: number) => {
    this.selectedCategory = category;
    this.setSelectedPage(0);
  };
  setSelectedPage = (page: number) => {
    this.selectedPage = page;
  };
}

export default new FilterStore();
