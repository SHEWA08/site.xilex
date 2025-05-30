import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateGoods from '../components/modals/CreateGoods';
import "../styles/Admin.css"; 

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [goodsVisible, setGoodsVisible] = useState(false);

  return (
    <Container className="admin-container">
      <h1 className="admin-title">Панель администратора</h1>
      <Button className="admin-btn" onClick={() => setTypeVisible(true)}>Добавить тип</Button>
      <Button className="admin-btn" onClick={() => setBrandVisible(true)}>Добавить бренд</Button>
      <Button className="admin-btn" onClick={() => setGoodsVisible(true)}>Добавить товар</Button>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateGoods show={goodsVisible} onHide={() => setGoodsVisible(false)} />
    </Container>
  );
};

export default Admin;
