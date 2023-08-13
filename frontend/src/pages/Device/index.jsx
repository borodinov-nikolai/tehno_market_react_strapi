import React from 'react'
import $api from '../../http'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container';
import styles from './Device.module.scss';
import Button from "react-bootstrap/Button"
 
const Device = () => {

     const [device, setDevice] = React.useState('');    

    const { name } = useParams();
    const {root, inner, img, title, description_holder, price_holder, price , description, description_text, btn}= styles;
    React.useEffect(() => {

              
        console.log(name)
        const getDevice = async () => {
            try {
                const res = await $api.get('/devices', {
                    params: {
                        filters: {
                            name
                        }
                    }
                })
                

                setDevice(res.data.data[0].attributes)    
                  
                 
                console.log(res.data.data[0].attributes)        

            } catch (e) {
                console.error('Error', e.message)
            }
        }

        getDevice();

    }, []

     
    
    )
    
    console.log(device.description)
    return (
        <Container className={root} >
            <div className={inner} >

            <div className={description_holder} >
                <img className={img} src={device.imgURL} alt="" />
                <div className={description} >

                <h2 className={title}>{device.name}</h2>
                <p className={description_text} >{device.description}</p>
                </div>
            </div>
            </div>


            <div className={price_holder} >
                  <div className={price}>Цена: {device.price}р </div>
                  <Button className={btn} variant="dark" > Закакзать</Button>
            </div>
                


        </Container>
    )
}

export default Device