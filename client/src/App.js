import React, { useContext, useEffect, useState }  from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/NavBar';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import {check} from "./http/userApi";
import { Spinner } from 'react-bootstrap';




const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

useEffect(() => {
    setTimeout(() => {
        check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
      
    }).finally(() => setLoading(false))
  }, 1000)
    
}, [])

if (loading) {
  return <Spinner animation={"grow"}/>
}

  return (
    <BrowserRouter>
    <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
