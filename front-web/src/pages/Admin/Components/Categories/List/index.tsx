import Pagination from 'core/components/Pagination';
import { CategoriesResponse } from 'core/types/Product';
import history from 'core/utils/history';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryCard from '../Card';
import './styles.scss'

const CategoryList = () => {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [activePage, setActivePage] = useState(0);
    const[isLoading,setIsLoading] = useState(false);
    const history = useHistory();

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        setIsLoading(true)
        makeRequest({ url: '/categories', params })
            .then(response => setCategoriesResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage])

    useEffect(() => {
        getCategories();
    }, [getCategories])

    
    
    const handCreate = () => {
        history.push("/admin/categories/create");
    }
    
    const onRemove = (categoryId: number) => {
        const confirm = window.confirm("Deseja excluir a categoria selecionada?");
        if (confirm){
            makePrivateRequest({
                url: `/categories/${categoryId}`,
                method: 'DELETE'
            })
                .then(() => {
                    toast.success("Categoria excluida com sucesso!")
                    history.push('/admin/categories')
                    getCategories();
                })
                .catch(() => {
                    toast.error("Falha ao excluir categoria!")
                    history.push('/admin/categories')
                })
        }
    }
    return (
        <div className="admin-category-list">
            <button
                className="btn btn-primary btn-lg"
                onClick={handCreate}

            >
                ADCIONAR
            </button>
            <div className="admin-list-container">
                {
                    categoriesResponse?.content.map(cat => (
                        <CategoryCard
                            category={cat} key={cat.id}
                            onRemove={onRemove}
                        />
                    ))
                }
            </div>
            {categoriesResponse &&
                    <Pagination
                        totalPages={categoriesResponse?.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                }

        </div>
    )
}

export default CategoryList;