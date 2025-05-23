import React from 'react';
import { Col, Container, Image, Row , Card} from 'react-bootstrap';
import BigStar from '../assets/BigStar.png'
const GoodsPage = () => {
  const goods = {id: 1, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'}
  const description = [
    {id:1, title: 'Сезон', description: '2024'},
    {id:2, title: 'Материал подошвы', description: 'TPU'},
    {id:3, title: 'Тип подошвы', description: 'FG'},
    {id:4, title: 'Размеры', description: '43'},
  ]
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={goods.img}/>

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
        {description.map((info, index) =>
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description} 
          </Row>
        )}
      </Row>
      
    </Container>
  );
};

export default GoodsPage;
