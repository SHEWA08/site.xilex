import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row , Card} from 'react-bootstrap';
import BigStar from '../assets/BigStar.png'
import  {useParams} from 'react-router-dom'
import { fetchOneGoods } from '../http/goodsApi';
const GoodsPage = () => {
  const [goods, setGoods] = useState({info: []})
  const {id} = useParams()
useEffect(() => {
    fetchOneGoods(id).then(data => setGoods(data))

}, [])

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + goods.img}/>

      </Col>

      <Col md={4}>
        <Row className="d-flex flex-column align-items-center">
          <h2>{goods.name}</h2>
          <div className="d-flex align-items-center justify-content-center"
          style={{background: `url(${BigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize: 64 }}
          >
            
            
            {goods.rating}
          </div>
        </Row>
  
      </Col>
      <Col md={4}>
          <Card
          className="d-flex-column align-items-center justify-content-around"
          style={{width:300, height:300, fontSize:16, border: '5px solid lightgray'}}>
            
            <h3>От: {goods.price} BYN</h3>
            <button variant={"outline-dark"} style={{backgroundColor: 'white', padding: '10px 20 px', border:'2px solid black', fontSize:'16', borderRadius:'5px'}}>Добавить в корзину</button>
          </Card>
      </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {goods.info.map((info, index) =>
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description} 
          </Row>
        )}
      </Row>
      
    </Container>
  );
};

export default GoodsPage;
