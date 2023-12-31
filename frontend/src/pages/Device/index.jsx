import React from 'react'
import $api from '../../http'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container';
import styles from './Device.module.scss';
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import { addCartItem } from "../../redux/slices/cartSlice"

const Device = () => {
    const dispatch = useDispatch();
    const [deviceId, setDeviceId] = React.useState('');
    const [deviceImage, setDeviceImage] = React.useState('');
    const [device, setDevice] = React.useState('');
    const { name } = useParams();
    React.useEffect(() => {


        const getDevice = async () => {
            try {
                const res = await $api.get('/devices', {
                    params: {
                        filters: {
                            name
                        },
                        populate: '*'
                    }
                })
                 

                setDevice(res.data.data[0].attributes);
                setDeviceId(res.data.data[0].id);
                setDeviceImage(res.data.data[0].attributes.image.data.attributes.url);
              

            } catch (e) {
                console.error('Error', e.message)
            }
        }

        getDevice();

    }, []

    )

    return (
        <Container className={styles.root} >
            <div className={styles.inner} >

                <div className={styles.description_holder} >
                    <img className={styles.img} src={process.env.REACT_APP_IMGURL + deviceImage} alt="" />
                    <div className={styles.description} >

                        <h2 className={styles.title}>{device.name}</h2>
                        <p className={styles.description__text} >{device.description}</p>
                    </div>
                </div>
            </div>


            <div className={styles.price_holder} >
                <div className={styles.price}>Цена: {device.price}р </div>
                <Button onClick={() => dispatch(addCartItem({id:deviceId, name: device.name, price: device.price, image: deviceImage }))} className={styles.btn} variant="dark" >В корзину</Button>
            </div>



        </Container>
    )
}

export default Device