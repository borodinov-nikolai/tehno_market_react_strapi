import React from "react";
import Container from "react-bootstrap/esm/Container";
import styles from './HeaderNavbar.module.scss'
import { useDispatch } from "react-redux";
import {setTypeId, setBrandId} from '../../../redux/slices/filtersSlice'
import $api from '../../../http/index'
import { Link } from "react-router-dom";



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


  return (
    <div className="bg-dark">



       


      <Container>
        <ul className={styles.menuList + ' bg-dark'}>

          {types.map(({attributes, id})=> {
       return  <Link key={id} style={{textDecoration: 'none'}} to={`http://localhost:3000/?pagination%5Bpage%5D=1&pagination%5BpageCount%5D=2&filters%5Bname%5D%5B%24containsi%5D=&filters%5Bbrand%5D=&filters%5Btype%5D%5Bid%5D=${id}&sort%5B0%5D=price%3Aasc`}>
         <li  onClick={()=>{dispatch(setTypeId(id)); dispatch(setBrandId(null))}} className={styles.menuItem}> {attributes.name} </li>
       </Link>
          }) }


      </ul>
      </Container>

    </div>

  );
}

export default HeaderNavbar;
