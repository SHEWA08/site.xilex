import React, { useContext, useState } from 'react';
import {Button, Container, Form, Row} from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login ,registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [eamil, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data;
    if(isLogin) {
        data = await login(eamil, password);
        navigate(SHOP_ROUTE)
    } else {
        data = await registration(eamil, password);
    }
    user.setUser(data.user)
    user.setIsAuth(true)

    } catch (e) {
      alert(e.response.data.message)
    }
    
  }
  

  return (
    <Container 
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight -54 }}
      >
        <Card style={{width: 600}} className="p-5">
          <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
          <Form className="d-flex flex-column">
            <Form.Control
                className="mt-2"
                placeholder="Введите ваш email..."
                value={eamil}
                onChange={e => setEmail(e.target.value)}
            />

              <Form.Control
                className="mt-1"
                placeholder="Введите ваш пароль..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
            />
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                {isLogin ? 
                <div>
                  Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                </div>
                :
                <div>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>
}
               <Button
            className="mt-3 align-self-end" 
            variant={"dark"}
            onClick={click}
            >
              {isLogin ? 'Войти' : 'Регистрация'} 
            </Button>
            </Row>

          </Form>
        </Card>
    </Container>
  );
});

export default Auth;
