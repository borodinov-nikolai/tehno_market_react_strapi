import React from 'react'
import $api from '../../http'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container';
import styles from './Device.module.scss';

const Device = () => {

     const [device, setDevice] = React.useState('');    

    const { name } = useParams();
    const {root, inner, img, title} = styles;
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

    return (
        <Container className={root} >
            <div className={inner} >

            <img className={img} src={device.imgURL} alt="" />

            <div className={title} >{device.name}  </div>
            </div>
        </Container>
    )
}

export default Device