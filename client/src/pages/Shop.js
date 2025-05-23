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
import Pages from '../components/Pages';


const Shop = observer(() => {
  const {goods} = useContext(Context)

useEffect(() => {
    fetchTypes().then(data => goods.setTypes(data))
    fetchBrands().then(data => goods.setBrands(data))
    fetchGoods(null, null, 1, 3).then(data => {
      goods.setGoods(data.rows)
      goods.setTotalCount(data.count)
    })
}, [])

useEffect(() => {
    fetchGoods(goods.selectedType.id, goods.selectedBrand, goods.page, 4).then(data => {
      goods.setGoods(data.rows)
      goods.setTotalCount(data.count)
    })
}, [goods.page, goods.selectedType, goods.selectedBrand])

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
            <TypeBar/>
        </Col>
        <Col md={9}>
            <BrandBar/>
            <GoodsList/>
            <Pages/>
        
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;