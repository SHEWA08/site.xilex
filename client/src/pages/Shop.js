import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import TypeBar from "../components/TypeBar";
import Row from 'react-bootstrap/Row';
import BrandBar from '../components/BrandBar';
import GoodsList from '../components/GoodsList';

const Shop = () => {
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
};

export default Shop;