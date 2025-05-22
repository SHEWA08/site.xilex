import { observer } from 'mobx-react-lite';
import React from 'react'
import { useContext } from 'react';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';

const Typebar = observer(() => {
    const {goods} = useContext(Context)
    return (
    <ListGroup as="ul">
            {goods.types.map(type =>
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    active={type.id === goods.selectedType.id}
                    onClick={() => goods.setSelectedType(type)}
                    key={type.id}
                    >

                    {type.name}
                </ListGroup.Item>
            )}
    </ListGroup>
    );
});

export default Typebar;