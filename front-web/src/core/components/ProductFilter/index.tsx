import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search.svg'
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Product';

type Props ={
    name?: string;
    category?:Category;
    handleChangeName: (name:string) => void;
    handleChangeCategory: (category:Category) => void;
    clearFilters: () => void;
}

const ProductFilter = ({ name,category,handleChangeName,handleChangeCategory,clearFilters }:Props) => {
    const [isLoadingCategories,setIsLoadingCategories] =useState(false);
    const [categories,setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: `/categories/` })
            .then(response => {
                setCategories(response.data.content)
            })
            .finally(() =>{
                setIsLoadingCategories(false);
            })
    }, [])

    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar Produto"
                    onChange={event => handleChangeName(event.target.value)}
                    value={name}
                />
                <SearchIcon />
            </div>
            <Select
                name="categories"
                value={category}
                key={`select-${category?.id}`}
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                className="filter-select-container"
                classNamePrefix="product-categories-select"
                placeholder="Categorias"
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />
            <button 
                    className="btn btn-outline-secondary"
                    onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default ProductFilter;