import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search.svg'


type Props ={
    name?: string;
    handleChangeName: (name:string) => void;
    clearFilters: () => void;
}

const CategoryFilter = ({ name,handleChangeName,clearFilters }:Props) => {
    return (
        <div className="card-base category-filters-container">
            <div className="category-input-search">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar categoria"
                    onChange={event => handleChangeName(event.target.value)}
                    value={name}
                />
                <SearchIcon />
            </div>
            
            <button 
                    className="btn btn-outline-secondary category-btn-filter-clean"
                    onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default CategoryFilter;