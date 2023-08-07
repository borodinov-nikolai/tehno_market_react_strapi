import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { setIsAuth } from '../../../redux/slices/userSlice';
import { Link } from 'react-router-dom';




const AuthorizationModal = () => {
    const [show, setShow] = React.useState(false);
  const [login, setLogin] = React.useState("");
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [registration, setRegistration] = React.useState(false);
  const dispatch = useDispatch();

  
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setMessage('');
    setRegistration(false)
  }






  const logining = async (email, password) => {
    try {
      await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password
      })
      .then((res) => {localStorage.setItem('token', res.data.jwt);
         dispatch(setIsAuth(true));
         handleClose();
     })
    } catch(error) {
      console.error('ошибка', error.response.status)
      if (error.response.status === 400) {
         setMessage('Неправильный логин или пароль')
      }
      if(error.response.status === 429) {
        setMessage('Слишком много попыток, повторите позднее')
      }
    }
      
}   
       

      return (
           
    

    <>
      <Button style={{ fontSize: '16px' }} size='sm' variant={'outline-dark '}  onClick={handleShow}>
      <i className="bi bi-box-arrow-in-right"></i> Войти
      </Button>

      <Modal  size={'lg'} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { !registration?
            
            <Form >
            <h3 style={{ textAlign: 'center' }} >Авторизация</h3>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                onChange={event => setEmail(event.target.value)}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                onChange={event => setPassword(event.target.value)}
              />
              <Form.Text className="text-danger">
                {message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
             <Form.Text> Нет аккаунта? <span onClick={()=>setRegistration(true)} style={{color: 'blue', textDecoration:'underline', cursor: 'pointer'}} >Зарегистрируйся</span>  </Form.Text>
            </Form.Group>
            <div className='d-flex justify-content-end'>

              <Button onClick={() => logining(email, password)} className='mr-4 fs-5' variant="dark" >
                Войти
              </Button>
            </div>
          </Form>
           :
           
           <Form>
           <h3 style={{ textAlign: "center" }}>Регистрация</h3>

           <Form.Group className="mb-3" controlId="formBasicEmail">
             <Form.Label>Логин</Form.Label>
             <Form.Control
               type="text"
               placeholder="Введите логин"
               onChange={(event) => setLogin(event.target.value)}
             />
           </Form.Group>
           <Form.Group className="mb-3" controlId="formBasicEmail">
             <Form.Label>Email</Form.Label>
             <Form.Control
               type="email"
               placeholder="Введите email"
               onChange={(event) => setEmail(event.target.value)}
             />
           </Form.Group>

           <Form.Group className="mb-3" controlId="formBasicPassword">
             <Form.Label>Пароль</Form.Label>
             <Form.Control
               type="password"
               placeholder="Введите пароль"
               onChange={(event) => setPassword(event.target.value)}
             />
             <Form.Text className="text-danger"></Form.Text>
           </Form.Group>

           <div className="d-flex justify-content-end">
             <Button className="mr-4 fs-5" variant="dark">
               Зарегистрироваться
             </Button>
           </div>
         </Form>
        }
        </Modal.Body>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthorizationModal