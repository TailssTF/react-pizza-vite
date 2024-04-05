import { makeAutoObservable } from "mobx";

interface Sorting {
  name: string;
  sortProperty: string;
}

type Order = "desc" | "asc";

class FilterStore {
  selectedCategory = 0;
  selectedPage = 0;
  selectedSorting: Sorting = {
    name: "популярности",
    sortProperty: "rating",
  };
  selectedOrder: Order = "desc";

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
  setSelectedSorting = (sorting: Sorting) => {
    this.selectedSorting = sorting;
  };
  setSelectedOrder = (order: Order) => {
    this.selectedOrder = order;
  };
}

export default new FilterStore();
