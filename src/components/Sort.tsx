import { useState } from "react";

interface Sorting {
  name: string;
  sortProperty: string;
}

interface SortingState {
  selectedSorting: Sorting;
  setSelectedSorting: (n: Sorting) => void;
  selectedOrder: "desc" | "asc";
  setSelectedOrder: (s: "desc" | "asc") => void;
}

function Sort(props: SortingState) {
  const {
    selectedSorting,
    setSelectedSorting,
    selectedOrder,
    setSelectedOrder,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortList = [
    { name: "популярности", sortProperty: "rating" },
    { name: "цене", sortProperty: "price" },
    { name: "алфавиту", sortProperty: "title" },
  ];

  const onChangeSorting = (sorting: Sorting) => {
    setSelectedSorting(sorting);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <div
          className="sort__arrow"
          onClick={() =>
            setSelectedOrder(selectedOrder == "desc" ? "asc" : "desc")
          }
        >
          {selectedOrder == "desc" ? <>&#128899;</> : <>&#128897;</>}
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{selectedSorting.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sorting, i) => (
              <li
                key={i}
                className={
                  selectedSorting.sortProperty == sorting.sortProperty
                    ? "active"
                    : ""
                }
                onClick={() => onChangeSorting(sorting)}
              >
                {sorting.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
