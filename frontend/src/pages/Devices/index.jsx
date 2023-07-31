import React from 'react'
import ProductCard from '../../components/devicesPage/ProductCard';
import Container from 'react-bootstrap/esm/Container';
import $api from '../../http';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PaginationBar from '../../components/devicesPage/Pagination';
import './style.scss'


const Devices = () => {
  const [data, setData] = React.useState([])
  const [searchData, setSearchData] = React.useState('')
  
  
   const token = localStorage.getItem('token')
 

  React.useEffect( ()=>{
  
     const getItems = async()=>{
      await $api.get('/devices',{
        params:{
           pagination: {
            page: 1,
            pageSize: 20
           },
           filters: {
               name: {
                $containsi: ''
               },
              //  brand: {
              //   id: 1
              //  },
              //  type: {
              //   id: 1
              //  }
           },
           sort: {
            0: 'price:asc'
          }
        }
       
      })
      .then(res=>setData(res.data.data))
    }


    
    
    getItems();

    
  },[])
  
  

  return (
    <>
    <Container >
      <div className= 'sort__menu d-flex pt-5 justify-content-between ' >
     
        <div className='d-flex gap-2 animate__animated animate__bounceInLeft'>
          <Button variant="secondary" className='button border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Poco</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Honor</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Samsung</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Apple</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Huawei</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Realme</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>OnePlus</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Google</Button>
          <Button variant="secondary" className='border-0' style={{backgroundColor: "rgb(235 235 235)", color: 'black'}}>Xiaomi</Button>
        </div>
    
        <div className='animate__animated animate__bounceInRight'>
          <span className='me-4 pt-2' >Сортировка:</span>
           <Form.Select aria-label="Default select" className='d-inline-block'  style={{width: '240px', backgroundColor: "rgb(235 235 235)"}}>
            <option>По названию</option>
            <option value="1">по цене(повозрастанию)</option>
            <option value="2">по цене(по убыванию)</option>
            <option value="3">по рейтингу(по возрастанию)</option>
            <option value="4">по рейтингу(по убыванию)</option>
          </Form.Select>
        </div>
      </div>
      <Container className='d-flex pt-5 gap-4 flex-wrap'>
        {data.map(({id, attributes})=>{
        return <ProductCard key={id} name={attributes.name} price={attributes.price} img={attributes.img}/>
        })}
      <PaginationBar/>
      </Container>
    </Container>
      </>
  )
}

export default Devices