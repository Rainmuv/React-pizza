import React from 'react'

import ReactPaginate from 'react-paginate';

import styles from './Paginatiom.module.scss'

const Pagination = ({ value, onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.pagi}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={value - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination