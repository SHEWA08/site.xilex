import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const {goods} =  useContext(Context)
    const pageCount = Math.ceil(goods.totalCount / goods.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i +1)
        
    }

    return (
        <Pagination className="mt-5">
            {pages.map(page => 
                <Pagination.Item
                    key={page}
                    active={goods.page === page}
                    onClick={() => goods.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}

        </Pagination>
    );
});

export default Pages;