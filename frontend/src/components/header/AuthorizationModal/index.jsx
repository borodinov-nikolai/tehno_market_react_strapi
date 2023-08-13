import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector, useDispatch} from 'react-redux';
import { setIsAuth, setUser } from '../../../redux/slices/userSlice';
import $api from '../../../http';




const AuthorizationModal = () => {
    const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [autorizationShow, setAuthorizationShow] = React.useState(true);
  const [registrationShow, setRegistrationShow] = React.useState(false);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const {isAuth, name, id} = useSelector((state)=> state.user)

  const dispatch = useDispatch();

  
 

   // функция сброса введеных данных при переключении окна

   const clearValues = ()=> {
       setUsername('');
       setEmail('');
       setPassword('');
       setMessage('');
   }


    // Скрытие показ модального окна
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
         setAuthorizationShow(true);
    setRegistrationShow(false);
    setRegistrationSuccess(false);
    clearValues();
    }, 500);
 

  }


  // Функция авторизации

  const login = async (email, password) => {
    try {
      await $api.post('auth/local', {
        identifier: username,
        password
      })
      .then((res) => {localStorage.setItem('token', res.data.jwt);
         dispatch(setIsAuth(true));
         dispatch(setUser(res.data.user));
         handleClose();
     })
    } catch(error) {
      console.error('ошибка', error.response)
      if (error.response.status === 400) {
         setMessage('Неправильный логин или пароль')
      }
      if(error.response.status === 429) {
        setMessage('Слишком много попыток, повторите позднее')
      }
    }
      
}   

// Функция регистрации

const registration = async (username, email, password)=>{
  try {
    await $api.post('auth/local/register', {
      username,
      email,
      password
    })
    .then((res)=>{localStorage.setItem('token', res.data.jwt);
    dispatch(setIsAuth(true));
    dispatch(setUser(res.data.user));
    setRegistrationShow(false);
    setRegistrationSuccess(true);
} )

  } catch(error) {
    console.error('Ошибка', error.response);
    
    if (error.response.status === 400 && error.response.data.error.message === 'password must be at least 6 characters') {
     setMessage('Пароль должен содержать не менее 6 символов')
  }
    if (error.response.status === 400 && error.response.data.error.message === 'email must be a valid email') {
      setMessage('Неправильный email')
   }
    if (error.response.status === 400 && error.response.data.error.message == 'Email or Username are already taken') {
      setMessage('Пользователь с таким логином или email уже существует')
   }
   if(error.response.status === 429) {
     setMessage('Слишком много попыток, повторите позднее')
   }
  }
}



       


return (
           
    

    <>

       {/* Отображение кнопки в Хедере */}

      {!isAuth && <Button style={{ fontSize: '16px' }} size='sm' variant={'outline-dark '}  onClick={handleShow}>
      <i className="bi bi-box-arrow-in-right"></i> Войти
      </Button>}

      <Modal  size={'lg'} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>


          {/* Отображается форма авторизации */}

          { autorizationShow &&
            
            <Form >
            <h3 style={{ textAlign: 'center' }} >Авторизация</h3>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email или логин</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Введите email или логин"
                onChange={event => setUsername(event.target.value)}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Введите пароль"
                onChange={event => setPassword(event.target.value)}
              />
              <Form.Text className="text-danger">
                {message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
             <Form.Text> Нет аккаунта? <span onClick={()=>{setRegistrationShow(true); setAuthorizationShow(false); clearValues()}} style={{color: 'blue', textDecoration:'underline', cursor: 'pointer'}} >Регистрация</span>  </Form.Text>
            </Form.Group>
            <div className='d-flex justify-content-end'>

              <Button onClick={() => login(email, password)} className='mr-4 fs-5' variant="dark" >
                Войти
              </Button>
            </div>
          </Form>
        }
           
           {/* Отображается форма регистрации */}

         { registrationShow &&
          <Form>
          <h3 style={{ textAlign: "center" }}>Регистрация</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Введите логин"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Введите email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Введите пароль"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Form.Text className="text-danger">
            {message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text> Есть аккаунт? <span onClick={()=>{setRegistrationShow(false); setAuthorizationShow(true); clearValues()}} style={{color: 'blue', textDecoration:'underline', cursor: 'pointer'}} >Авторизация</span>  </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button onClick={()=> registration(username, email, password)} className="mr-4 fs-5" variant="dark">
              Зарегистрироваться
            </Button>
          </div>
        </Form>
      
}

           {/* Отображается сообщение об успешной регистрации */}

   {
   registrationSuccess && 
     <div>
     <div style={{textAlign : 'center', padding: '80px 0'}} > Вы успешно зарегестрировались !</div>
     <div className='d-flex justify-content-end' ><Button onClick={handleClose} variant='dark' >Выйти</Button></div>
   </div> 

   }
        </Modal.Body>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthorizationModal