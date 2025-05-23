import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateGoods from '../components/modals/CreateGoods';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [goodsVisible, setGoodsVisible] = useState(false)
  return (
    <Container className="d-flex flex-column">
      <Button
       variant={"outline-dark"}
       className="mt-2"
       onClick={() => setTypeVisible(true)}
       >
        Добавить тип
      </Button>
      <Button
       variant={"outline-dark"} 
       className="mt-2"
       onClick={() => setBrandVisible(true)}
       >
        Добавить бренд
      </Button>
      <Button 
      variant={"outline-dark"} 
      className="mt-2"
      onClick={() => setGoodsVisible(true)}
      >
        Добавить товар
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateGoods show={goodsVisible} onHide={() => setGoodsVisible(false)}/>
    </Container>
  );
};

export default Admin;
