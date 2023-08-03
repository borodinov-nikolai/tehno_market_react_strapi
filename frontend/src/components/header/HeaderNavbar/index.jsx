import React from "react";
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-router-dom";
import styles from './HeaderNavbar.module.scss'
import { useDispatch } from "react-redux";
import {setTypeId} from '../../../redux/slices/filtersSlice'
import $api from '../../../http/index'



function HeaderNavbar() {
  const [visibilitySmart, setVisibilitySmart] = React.useState("none");
  const [visibilityPad, setVisibilityPad] = React.useState("none");
  const [types, setTypes] = React.useState([]);
  const dispatch = useDispatch();

  
 
  React.useEffect(()=>{
    const getTypes = async ()=> {
      await $api.get('/types')
    .then(res=> setTypes(res.data.data))
  };
 
 getTypes();

},[]) 

console.log(types)

  return (
    <div className="bg-dark">



       


      <Container>
        <ul className={styles.menuList + ' bg-dark'}>

          {types.map(({attributes, id})=> {
       return  <li key={id}  onClick={()=>dispatch(setTypeId(id))} className={styles.menuItem}> {attributes.name} </li>
          }) }


      </ul>
      </Container>

    </div>

  );
}

export default HeaderNavbar;
