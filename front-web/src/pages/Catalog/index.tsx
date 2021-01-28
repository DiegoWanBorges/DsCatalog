import React from 'react'
import ProductCard from './components/ProductCard'
import './styles.scss'

const Catalog = () => (
    <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de Produtos</h1>

        <div className="catalog-produts">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
);

export default Catalog;
