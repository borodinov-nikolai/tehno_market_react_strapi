import React from 'react';
import ProductCard from '../../components/devicesPage/ProductCard';
import $api from '../../http';
import Button from 'react-bootstrap/Button';
import PaginationBar from '../../components/devicesPage/Pagination';
import {useSelector, useDispatch} from 'react-redux'
import {setBrandId,  setFilters } from '../../redux/slices/filtersSlice'
import Sort from '../../components/devicesPage/Sort';
import { setPageCount, setPage, setPagination} from '../../redux/slices/paginationSlice';
import Search from '../../components/devicesPage/Search';
import {useNavigate} from 'react-router-dom';
import qs from 'qs';
import styles from "./Devices.module.scss";
import { useLocation } from 'react-router-dom';


const Devices = () => {
  const [devices, setDevices] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const isSearch = React.useRef(false);
  const location = useLocation();
  const sort = useSelector((state)=> state.filters.sort);
  const page = useSelector((state)=> state.pagination.page);
  const pageCount = useSelector((state)=> state.pagination.pageCount);
  const {brandId, typeId, search} = useSelector((state)=> state.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

//Функция для отправки запросов на сервер




const getDevices = async()=>{
    try{

    

      await $api.get('/devices',{
        params:{
          pagination: {
           page: page,
           pageSize: 12 
          },
          filters: {
            name: {
              $containsi: search
             },
             brand: {
               id: brandId
              },
               type: {
                  id: typeId
              }
           },
          sort: {
           0: sort
         },
          populate: "*"
       }
      })
     .then(res=>{setDevices(res.data.data);
      dispatch(setPageCount(res.data.meta.pagination.pageCount));
    })
  
    } catch(error) {
      console.error('Ошибка', error.response)
    }
   
}
  

  





//Если есть строка поиска берем из нее данные фильтров

React.useEffect(()=>{
  if (window.location.search){
    const {filters, pagination, sort} = qs.parse(window.location.search.substring(1));
    dispatch(setFilters({...filters, sort}));
    dispatch(setPagination(pagination));
    isSearch.current = true
    }

},[])



   // Загружаем массив девайсов и формируем строку запросов из данных фильтров


React.useEffect(()=>{

if(!isSearch.current) {
  
     getDevices()  


}

isSearch.current = false


let brand = !brandId ? null : {id: brandId};

  const queryString = qs.stringify({
    pagination:{
      page: page,
      pageCount: pageCount
    },
    filters: {
      name: {
        $containsi: search
      },
     brand: brand,
     type: {
      id: typeId
     }
    },
    sort: {
       0:sort
    }

  })

  navigate(`?${queryString}`);


},[brandId, typeId, sort, page, search, pageCount, location])



//Получаем список брендов выбронного типа

React.useEffect(()=>{
  const getBrands = async ()=> {
    try{

      await $api.get('/types', {
        params: {
          filters: {
            id: typeId,
          },
         populate: '*'
        }
      })
    .then(res=> setBrands(res.data.data[0].attributes.brands.data.map((item)=>item)))
    } catch(error) {
      console.error('ошибка', error.response)
    }
};



getBrands();
},[typeId]) 




 

  return (
    <>
    

      <div className= {'sort__menu d-flex pt-5 justify-content-between '+ styles.root}>
     
        <div className='d-flex gap-2 flex-wrap'>
        <Button variant="secondary" onClick={()=>{dispatch(setBrandId(null)); dispatch(setPage(1)) }} className={false===Boolean(brandId)?'button border-0 activeBrand':'button border-0'} style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Все</Button>
          {
          brands.map(({id, attributes})=>{
          return <Button key={id} variant="secondary" onClick={()=>{  dispatch(setBrandId(id)); dispatch(setPage(1))}} className={id===Number(brandId)?'button border-0 activeBrand':'button border-0'} style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>{attributes.name}</Button>
          })
          }
       
        </div>

            <div className={styles.filters} >
              <div className={styles.search}><Search/></div>
              
              
                    
              
                         <div className={styles.sort} ><Sort/></div>
            </div>

     

      </div>
      
        <div  className='row mt-5 gx-4 gy-4'>

        {devices.map(({id, attributes})=>{
        return <ProductCard key={id} id={id} name={attributes.name} price={attributes.price} image={attributes.image}/>
        })}
        </div>
      
      <PaginationBar/>

      </>
  )
}

export default Devices