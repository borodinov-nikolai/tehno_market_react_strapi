import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './OrderModal.module.scss'
import Form from 'react-bootstrap/Form';
import $api from '../../../http';
import { useSelector, useDispatch } from 'react-redux';
import { setItemList, setTotalPrice } from '../../../redux/slices/cartSlice';



function OrderModal() {
    const [show, setShow] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [adress, setAdress] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [orderSend, setOderSend] = React.useState(false);
    const { itemList, totalPrice } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const { root } = styles;



    const handleClose = () => {
        setShow(false);
        setMessage('');

        if(orderSend === true) {
        setUserName('');
        setAdress('');
        setPhoneNumber('');
        }
      
        dispatch(setItemList([]));
        dispatch(setTotalPrice(0));
        setTimeout(()=> setOderSend(false), 1000 );
    };

    const handleShow = () => setShow(true);

    const sendOrder = async () => {
        if (userName && phoneNumber && adress) {

            try {
                await $api.post('/orders', {
                    data: {
                        name: userName,
                        adress,
                        phoneNumber,
                        order: itemList.map(({ id, name, price, count }, index) => {
                            return `Товар №: ${index + 1}, id: ${id}, Название: ${name}, Цена: ${price}, Количество: ${count}`
                        }).join(';\n') + '.' + `\nОбщая сумма: ${totalPrice}p`
                    }



                })

                setMessage('');
                setOderSend(true);


            } catch (e) {
                console.error('ошибка', e.message)
            }

        } else {
            setMessage('Заполните все поля')
        }



    }

    

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Оформить заказ
            </Button>

            <Modal className={root} show={show} onHide={handleClose}>

              {!orderSend &&  <>
              <Modal.Header closeButton>
                    <Modal.Title>Оставить заявку</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="Введите имя" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" placeholder="Введите номер телефона" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Адрес</Form.Label>
                            <Form.Control onChange={(e) => setAdress(e.target.value)} value={adress} type="text" placeholder="Введите адрес" />
                        </Form.Group>
                        <Form.Text className="text-danger">
                            {message}
                        </Form.Text>
                    </Form>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="dark" onClick={() => sendOrder()}>
                        Заказать
                    </Button>

                </Modal.Footer>
                   </>}



              {orderSend &&  <>
              <Modal.Header closeButton>
                    <Modal.Title>Заявка отправлена !</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form className="text">Ваш заказ принят. Наш менеджер свяжется с вами в ближайшее время.</Form>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="dark" onClick={handleClose}>
                        Выйти
                    </Button>

                </Modal.Footer>
                   </>}

                
            </Modal>
        </>
    );
}

export default OrderModal;