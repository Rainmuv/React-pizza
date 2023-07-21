import React from 'react'

import ReactPaginate from 'react-paginate';

import styles from './Paginatiom.module.scss'

const Pagination = ({ value, onChangePage }) => {
console.log(value);
  return (
    <div>
      <ReactPaginate
        className={styles.pagi}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => onChangePage(e.selected )}
        pageRangeDisplayed={4}
        pageCount={4}
        forcePage={0}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination