import Pagination from 'core/components/Pagination';
import ProductFilter from 'core/components/ProductFilter';
import { Category, ProductsResponse } from 'core/types/Product';
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
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            name: name,
            categoryId: category?.id,
            page: activePage,
            linesPerPage: 4,
            orderBy: "id",
            direction: "DESC"
        }
        setIsLoading(true)
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, category, name])

    useEffect(() => {
        getProducts();
    }, [getProducts])

    const history = useHistory();


    const handCreate = () => {
        history.push("/admin/products/create");
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm("Deseja excluir o produto selecionado?");
        if (confirm) {
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
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }
    const handleChangeCategory = (category: Category) => {
        setActivePage(0);
        setCategory(category);

    }
    const clearFilters = () => {
        setActivePage(0);
        setCategory(undefined);
        setName('');
    }
    return (
        <div >
            <div className="list-container">
                <button
                    className="btn btn-primary btn-lg btn-filter"
                    onClick={handCreate}
                >
                    ADCIONAR
                </button>
                <div className="list-filter">
                    <ProductFilter
                        name={name}
                        category={category}
                        handleChangeName={handleChangeName}
                        handleChangeCategory={handleChangeCategory}
                        clearFilters={clearFilters}
                    />
                </div>
        </div>


            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
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