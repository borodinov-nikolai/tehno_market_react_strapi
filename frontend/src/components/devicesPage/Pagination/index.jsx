import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import styles from "./Pagination.module.scss"



const PaginationBar = () => {
   let pageCount = 18
    let active = 1;
    let items = [];
for (let number = 1; number <= pageCount; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} >
      {number}
    </Pagination.Item>,
  );
}

  return (
  
      <Pagination className={styles.holder + ' animate__animated animate__bounceInUp'}>
        <Pagination.First />
        <Pagination.Prev/>
            {items}
            <Pagination.Next />
        <Pagination.Last />
      </Pagination>

  )
}

export default PaginationBar