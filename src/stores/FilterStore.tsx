import { makeAutoObservable } from "mobx";
import { sortList } from "../components/Sort";

export interface Sorting {
  name: string;
  sortProperty: string;
}

type Order = "desc" | "asc";

export interface IParameters {
  category: string;
  sortBy: string;
  order: string;
  page: string;
  search?: string;
}

const defaultSorting: Sorting = {
  name: "популярности",
  sortProperty: "rating",
};

class FilterStore {
  selectedCategory = 0;
  selectedPage = 0;
  selectedSorting: Sorting = defaultSorting;
  selectedOrder: Order = "desc";
  searchValue: string = "";

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
  setSearchValue = (value: string) => {
    this.searchValue = value;
  };

  setFilters = (params: IParameters) => {
    const sortBy: Sorting =
      sortList.find((param) => param.sortProperty === params.sortBy) ||
      defaultSorting;
    const order = params.order == "asc" ? "asc" : "desc";

    this.setSelectedCategory(Number(params.category));
    this.setSelectedPage(Number(params.page));
    this.setSelectedSorting(sortBy);
    this.setSelectedOrder(order);
    if (params.search) {
      this.setSearchValue(params.search);
    }
  };
}

export default new FilterStore();
