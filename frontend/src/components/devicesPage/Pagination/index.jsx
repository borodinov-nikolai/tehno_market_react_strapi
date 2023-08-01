import React, { useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import styles from "./Pagination.module.scss"
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../../redux/slices/paginationSlice';

const PaginationBar = () => {
     const pageCount = useSelector((state)=>state.pagination.pageCount)
     const page = useSelector((state)=>state.pagination.page)
     let active = page;
     let items = [];

  const dispatch = useDispatch();


  // React.useEffect(()=>{
  //   console.log(pageCount)
  //   if(pageCount<page) {
  //     dispatch(setPage(1));
  //   }

  // },[page]);
  console.log(page)

for (let number = 1; number <= pageCount; number++) {
  items.push(
    <Pagination.Item onClick={()=>dispatch(setPage(number))} key={number} active={number === active} >
      {number}
    </Pagination.Item>,
  );
}

  return (
  
      <Container>

        {pageCount<1? '' : <Pagination className={styles.holder}>
          <Pagination.First />
          <Pagination.Prev/>
              {items}
              <Pagination.Next />
          <Pagination.Last />
        </Pagination>}
        
      </Container>

  )
}

export default PaginationBar