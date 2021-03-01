import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import Card from '../Card';
import './styles.scss'


const ProductList = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {

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
                {
                    productsResponse?.content.map(product => (
                        <Card
                            product={product} key={product.id}
                            onRemove={onRemove}
                        />
                    ))
                }
                {productsResponse &&
                    <Pagination
                        totalPages={productsResponse?.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                }

            </div>

        </div>
    )
}

export default ProductList