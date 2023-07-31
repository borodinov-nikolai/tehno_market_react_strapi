import React from 'react';
import ProductCard from '../../components/devicesPage/ProductCard';
import Container from 'react-bootstrap/esm/Container';
import $api from '../../http';
import Button from 'react-bootstrap/Button';
import PaginationBar from '../../components/devicesPage/Pagination';
import './style.scss';
import {useSelector, useDispatch} from 'react-redux'
import {setBrandId} from '../../redux/slices/filtersSlice'
import Sort from '../../components/devicesPage/Sort';
import { setPageCount, setPage } from '../../redux/slices/paginationSlice';
import Search from '../../components/devicesPage/Search';

const Devices = () => {
  const [devices, setDevices] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [searchData, setSearchData] = React.useState('');
  const [active, setActive] = React.useState(0)
  const sort = useSelector((state)=> state.filters.sort);
  const page = useSelector((state)=> state.pagination.page);
  const brandId = useSelector((state)=> state.filters.brandId);
  const search = useSelector((state)=> state.filters.search);
  const dispatch = useDispatch();


  
 React.useEffect(()=>{
  const getBrands = async ()=> {
    await $api.get('/brands')
    .then(res=> setBrands(res.data.data))
 };

 getBrands();
 },[]) 


  React.useEffect( ()=>{
  
     const getDevices = async()=>{
      await $api.get('/devices',{
        params:{
           pagination: {
            page: page,
            pageSize: 20
           },
           filters: {
               name: {
                $containsi: search
               },
               brand: {
               id: brandId
               },
              //  type: {
              //   id: 1
              //  }
           },
           sort: {
            0: sort
          }
        }
       })
      .then(res=>{setDevices(res.data.data);
      dispatch(setPageCount(res.data.meta.pagination.pageCount));
      dispatch(setPage(res.data.meta.pagination.page));

      });
    }
    getDevices();

    },[brandId, sort, page, search])
    

  
    
  return (
    <>
    <Container >
      <div className= 'sort__menu d-flex pt-5 justify-content-between ' >
     
        <div className='d-flex gap-2'>
        <Button variant="secondary" onClick={()=>{dispatch(setBrandId(null)); setActive(0)}} className={0===active?'button border-0 activeBrand':'button border-0'} style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Все</Button>
          {brands.map(({id, attributes})=>{
          return <Button key={id} variant="secondary" onClick={()=>{dispatch(setBrandId(id)); setActive(id)}} className={id===active?'button border-0 activeBrand':'button border-0'} style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>{attributes.name}</Button>
          })
          }
       
        </div>
            <Search/>
        <div>

           <Sort/>

        </div>

      </div>
      <Container className='d-flex px-0 pt-5 gap-4 flex-wrap' >
        {devices.map(({id, attributes})=>{
        return <ProductCard key={id} name={attributes.name} price={attributes.price} img={attributes.img}/>
        })}
      </Container>
      
      <PaginationBar/>
    </Container>
      </>
  )
}

export default Devices