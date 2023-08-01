import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import styles from "./Pagination.module.scss"
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../../redux/slices/paginationSlice';

const PaginationBar = () => {
     const pageCount = useSelector((state)=>state.pagination.pageCount)
     const page = useSelector((state)=>state.pagination.page)
     let items = [];

  const dispatch = useDispatch();

  
  React.useEffect(()=>{
   
    if(pageCount<=page){
      dispatch(setPage(pageCount));
    }  else if(page===0){
      dispatch(setPage(1));
    } else {
      dispatch(setPage(page));
    }
    
  },[pageCount, page])
  


for (let number = 1; number <= pageCount; number++) {
  items.push(
    <Pagination.Item onClick={()=>dispatch(setPage(number))} key={number} active={number === page} >
      {number}
    </Pagination.Item>,
  );
}

  return (
  
      <Container>

        {pageCount<1? '' : <Pagination className={styles.holder}>
          <Pagination.First className={styles.button} onClick={()=>dispatch(setPage(1))} />
          <Pagination.Prev className={styles.button} onClick={()=>dispatch(setPage(page>1?page-1:1))}/>
              {items}
              <Pagination.Next className={styles.button} style={{boxShadow: "none !important"}} onClick={()=>dispatch(setPage(page<pageCount?page+1:pageCount))} />
          <Pagination.Last className={styles.button} onClick={()=>dispatch(setPage(pageCount))} />
        </Pagination>}
        
      </Container>

  )
}

export default PaginationBar