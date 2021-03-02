import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/ProductCardLoaders';
import './styles.scss'


const ProductList = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [activePage, setActivePage] = useState(0);
    const[isLoading,setIsLoading] = useState(false);
    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        setIsLoading(true)
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage])

    useEffect(() => {
        getProducts();
    }, [getProducts])

    const history = useHistory();


    const handCreate = () => {
        history.push("/admin/products/create");
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm("Deseja excluir o produto selecionado?");
        if (confirm){
            makePrivateRequest({
                url: `/products/${productId}`,
                method: 'DELETE'
            })
                .then(() => {
                    toast.success("Produto excluido com sucesso!")
                    history.push('/admin/products')
                    getProducts();
                })
                .catch(() => {
                    toast.error("Falha ao excluir produto!")
                    history.push('/admin/products')
                })
        }
    }

    return (
        <div className="admin-product-list">
            <button
                className="btn btn-primary btn-lg"
                onClick={handCreate}
            >
                ADCIONAR
            </button>
            <div className="admin-list-container">
                {isLoading ? <CardLoader/> : (
                        productsResponse?.content.map(product => (
                            <Card
                                product={product} key={product.id}
                                onRemove={onRemove}
                            />
                        ))
                )}
                
                {productsResponse &&
                    <Pagination
                        totalPages={productsResponse?.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                }

            </div>

        </div>
    )
}

export default ProductList