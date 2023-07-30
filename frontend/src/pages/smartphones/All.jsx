import React from 'react'
import axios from 'axios'
import ProductCard from '../../components/productCard';
import Container from 'react-bootstrap/esm/Container';
import $api from '../../http';
import Form from 'react-bootstrap/Form';




const All = () => {
  const [data, setData] = React.useState([])
  const [searchData, setSearchData] = React.useState('')
  
  
   const token = localStorage.getItem('token')
 

  React.useEffect( ()=>{
  
     const getItems = async()=>{
      await $api.get('/devices')
      .then(res=>setData(res.data.data))
    }
    
    getItems();

    
  },[])
  
  

  return (
    <>
    <Container >
      <div className= 'sort__dropdown d-flex mt-5 justify-content-end animate__animated animate__bounceInRight'>
        <span className='me-4 pt-2' >Сортировка:</span>
         <Form.Select aria-label="Default select" className='d-inline-block'  style={{width: '240px', backgroundColor: "rgb(235 235 235)"}}>
          <option>По названию</option>
          <option value="1">по цене(повозрастанию)</option>
          <option value="2">по цене(по убыванию)</option>
          <option value="3">по рейтингу(по возрастанию)</option>
          <option value="4">по рейтингу(по убыванию)</option>
      
        </Form.Select>
      </div>
      <Container className='d-flex pt-5 gap-4 flex-wrap'>
        {data.map(({id, attributes})=>{
        return <ProductCard key={id} name={attributes.name} price={attributes.price} img={attributes.img}/>
        })}
      </Container>
    </Container>
      </>
  )
}

export default All