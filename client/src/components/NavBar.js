import React, { useContext } from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button} from "react-bootstrap"
import { observer} from "mobx-react-lite";
import Container from 'react-bootstrap/Container'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();

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
            variant={"dark"}
            onClick={ () => 
            navigate(ADMIN_ROUTE)}
            >
              Центр упрвления
            </Button>

            <Button
             variant={"dark"}
             onClick={() => logOut()}
            className={"ms-2"}
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