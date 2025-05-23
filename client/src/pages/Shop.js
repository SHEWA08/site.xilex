import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import TypeBar from "../components/TypeBar";
import Row from 'react-bootstrap/Row';
import BrandBar from '../components/BrandBar';
import GoodsList from '../components/GoodsList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes, fetchBrands, fetchGoods } from '../http/goodsApi';

const Shop = observer(() => {
  const {goods} = useContext(Context)

useEffect(() => {
    fetchTypes().then(data => goods.setTypes(data))
    fetchBrands().then(data => goods.setBrands(data))
    fetchGoods().then(data => goods.setGoods(data.rows))
}, [])

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
            <TypeBar/>
        </Col>
        <Col md={9}>
            <BrandBar/>
            <GoodsList/>
        
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;