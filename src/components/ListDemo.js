import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { PickList } from 'primereact/picklist';
import { Coingecko } from '../services/Coingecko';

import { OrderList } from 'primereact/orderlist';
// import { ProductService } from '../service/ProductService';

export const Dashboard = () => {

    const listValue = [
        { name: 'San Francisco', code: 'SF',symbol:'s' },
        { name: 'London', code: 'LDN' ,symbol:'s'},
        { name: 'Paris', code: 'PRS' ,symbol:'s'},
        { name: 'Istanbul', code: 'IST' ,symbol:'s'},
        { name: 'Berlin', code: 'BRL' ,symbol:'s'},
        { name: 'Barcelona', code: 'BRC' ,symbol:'s'},
        { name: 'Rome', code: 'RM' ,symbol:'s'},
    ];

    const [picklistSourceValue, setPicklistSourceValue] = useState(listValue);
    const [picklistTargetValue, setPicklistTargetValue] = useState([]);
    const [orderlistValue, setOrderlistValue] = useState(listValue);
    const [dataviewValue, setDataviewValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const gecko = new Coingecko();



    const sortOptions = [
        { label: 'Price High to Low', value: '!current_price' },
        { label: 'Price Low to High', value: 'current_price' }
    ];

    useEffect(() => {
        // const productService = new ProductService();
        // productService.getProducts().then(data => setDataviewValue(data));
        gecko.getCoins().then(data=>setOrderlistValue(data))
        gecko.getMarkets().then(data=>setDataviewValue(data))
    }, []);

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const dataviewHeader = (
        <div className="p-grid p-nogutter">
            <div className="p-col-6" style={{ textAlign: 'left' }}>
                <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
            </div>
            <div className="p-col-6" style={{ textAlign: 'right' }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );

    const dataviewListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={data.image} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.symbol}</div>
                        {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.market_cap}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.current_price}</span>
                        {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                        {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.id}</span>
                        </div>
                        <span className={`product-badge status`}>{data.symbol}</span>
                    </div>
                    <div className="product-grid-item-content">
                        <img src={data.image} alt={data.name} />
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.symbol}</div>
                        {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">${data.current_price}</span>
                        <Button icon="pi pi-shopping-cart"></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        }
        else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    return (
        <div className="p-grid list-demo">
            <div className="p-col-12">
                <div className="card">
                    <h5>Crypto Market</h5>
                    <DataView value={dataviewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
                </div>
            </div>

            {/* <div className="p-col-12 p-lg-8">
                <div className="card">
                    <h5>PickList</h5>
                    <PickList source={picklistSourceValue} target={picklistTargetValue} sourceHeader="From" targetHeader="To" itemTemplate={(item) => <div>{item.name}</div>}
                        onChange={(e) => { setPicklistSourceValue(e.source); setPicklistTargetValue(e.target) }} sourceStyle={{ height: '200px' }} targetStyle={{ height: '200px' }}></PickList>
                </div>
            </div> */}

            <div className="p-col-12 p-lg-4">
                <div className="card">
                    <h5>Coins</h5>
                    <OrderList value={orderlistValue} listStyle={{ height: '200px' }} className="p-orderlist-responsive" rows={10} header="Coins" itemTemplate={(item) => <div>{item.name}({item.symbol})</div>}
                        onChange={(e) => setOrderlistValue(e.value)}></OrderList>
                </div>
            </div>
        </div>
    )
}
