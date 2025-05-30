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
import Pages from "../components/Pages";

import '../styles/Shop.css'; 

const Shop = observer(() => {
  const { goods } = useContext(Context);

  useEffect(() => {
    fetchTypes().then(data => goods.setTypes(data));
    fetchBrands().then(data => goods.setBrands(data));
    fetchGoods(null, null, 1, 2).then(data => {
      goods.setGoods(data.rows);
      goods.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchGoods(goods.selectedType.id, goods.selectedBrand.id, goods.page, 8).then(data => {
      goods.setGoods(data.rows);
      goods.setTotalCount(data.count);
    });
  }, [goods.page, goods.selectedType, goods.selectedBrand]);

  return (
    <Container className="shop-container">
      <Row className="shop-row-reverse">
        <Col md={9} className="main-content-column">
          <div className="brand-bar-wrapper">
            <BrandBar />
          </div>
          <div className="goods-list-wrapper">
            <GoodsList />
          </div>
          <div className="pagination-wrapper">
            <Pages />
          </div>
        </Col>
        <Col md={3} className="type-bar-column">
          <div className="type-bar-wrapper">
            <TypeBar />
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
