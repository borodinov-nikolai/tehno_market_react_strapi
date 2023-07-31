import React from 'react'
import Form from 'react-bootstrap/Form';
import {useDispatch} from 'react-redux'
import {setSort} from '../../../redux/slices/filtersSlice'

const Sort = () => {
  const dispatch = useDispatch();
  const sortList = [{name:"Сначала не дорогие", value:'price:asc'}, {name:"Сначала дорогие", value:'price:desc'},
   {name:"По рейтингу", value:"rating:desc"}, {name:"По названию", value:"name:asc"}]


  return (
    <>
          <span className='me-4 pt-2' >Сортировка:</span>
           <Form.Select onChange={(e)=>dispatch(setSort(e.target.value))} aria-label="Default select" className='d-inline-block'  style={{width: '240px', backgroundColor: "rgb(235 235 235)"}}>
           {sortList.map((item, i)=>{
                return <option key={i}  value={item.value} >{item.name}</option>
           })}
        
          </Form.Select>
    </>
  )
}

export default Sort