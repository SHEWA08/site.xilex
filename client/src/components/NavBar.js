import React, { useContext, useState, useEffect } from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';
import {Button, Badge} from "react-bootstrap"
import { observer} from "mobx-react-lite";
import Container from 'react-bootstrap/Container'
import { getBasket } from '../http/basketApi';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [basketCount, setBasketCount] = useState(0);

    useEffect(() => {
        if (user.isAuth) {
            getBasket().then(data => {
                setBasketCount(data.basket_goods?.length || 0);

            });
        }
    }, [user.isAuth]);

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
    }
    return (
       <Navbar bg="light" data-bs-theme="light">
        <Container>
            <NavLink style={{color:'black', textDecoration:'none'}} to={SHOP_ROUTE}>x1lex.by</NavLink>
          {user.isAuth ?
           <Nav className="ml-auto" style={{color: 'black', marginLeft: 'auto'}}>

            <Button 
                
                className='ms-2'
                variant={"dark"}
                onClick={() => navigate('/about')}
                 
            >
                 О нас
            </Button>

            <Button 

                                className='ms-2'
                                variant={"dark"}
                                onClick={() => navigate(BASKET_ROUTE)}
                            >
                               Корзина
                               {basketCount > 0 && (
                                    <Badge bg="info" className="ms-3 ml-1">
                                        {basketCount}
                                    </Badge>
                                )}
                            </Button>
            <Button 
            className='ms-2'
            variant={"dark"}
            
            onClick={ () => 
            navigate(ADMIN_ROUTE)}
            >
              Центр упрвления
            </Button>

            
            

            <Button
            className='ms-2'
             variant={"dark"}
             onClick={() => logOut()}
            
            >
              Выйти
            </Button>
          </Nav>
          :
          <Nav style={{color: 'black', marginLeft: 'auto'}}>
            <Button variant={"dark"}  onClick={ () => navigate(LOGIN_ROUTE)}>Авторизация</Button>


          </Nav>
}
        </Container>
       

      </Navbar>
      

    );
});

export default NavBar;