import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

interface selectedPageState {
  selectedPage: number;
  setSelectedPage: (n: number) => void;
}

function Pagination(props: selectedPageState) {
  const { selectedPage, setSelectedPage } = props;
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event) => setSelectedPage(event.selected)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
