import React from 'react'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../redux/slices/filtersSlice';

const Search = () => {
const dispatch = useDispatch();

  return (
    <Form.Control onChange={(e)=>dispatch(setSearch(e.target.value))} type="text" style={{width:'200px', marginRight:'-120px'}} placeholder="Поиск" />
  )
}

export default Search