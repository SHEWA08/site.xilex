import React, { useContext } from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import {Button} from "react-bootstrap"
import { observer} from "mobx-react-lite";
import Container from 'react-bootstrap/Container'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    return (
       <Navbar bg="light" data-bs-theme="light">
        <Container>
            <NavLink to={SHOP_ROUTE} style={{color:'black', textDecoration:'none'}}>x1lex.by</NavLink>
          {user.isAuth ?
           <Nav style={{color: 'black', marginLeft: 'auto'}}>
            <Button variant={"dark"} onClick={ () => navigate('/login')}>Центр упрвления</Button>
            <Button variant={"dark"} className={"ms-2"}>Войти</Button>
          </Nav>
          :
          <Nav style={{color: 'black', marginLeft: 'auto'}}>
            <Button variant={"dark"}  onClick={ () => user.setIsAuth(true)}>Авторизация</Button>
          </Nav>
}
        </Container>
       

      </Navbar>
      

    );
});

export default NavBar;