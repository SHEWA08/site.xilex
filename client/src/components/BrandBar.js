import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '../index';
import {Card, Row} from "react-bootstrap" 


const BrandBar = observer(() => {
    const {goods} = useContext(Context)
    return (
        <Row className="d-flex">
            {goods.brands.map(brand =>
                <Card
                    style={{cursor: 'pointer', maxWidth: '90px', fontSize: '12px'}}
                    key={brand.id}
                    className="p-3" 
                    onClick={() => goods.setSelectedBrand(brand)}
                    border={brand.id === goods.selectedBrand.id ? 'danger' : 'light'}
                >
                
                    {brand.name}
                </Card>
            )}

        </Row>
    );
});

export default BrandBar;