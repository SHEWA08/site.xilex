import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Context } from '../index';
import { Row } from 'react-bootstrap';
import GoodsItem from './GoodsItem';

const GoodsList = observer(() => {
    const {goods} = useContext(Context)

    return (
        <Row className="d-flex">
            {goods.goods.map(goods =>
                <GoodsItem key={goods.id} goods={goods}/>

            )}

        </Row>
    );
});

export default GoodsList;