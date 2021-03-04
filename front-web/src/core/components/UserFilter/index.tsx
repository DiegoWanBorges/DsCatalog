import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search.svg'


type Props ={
    name?: string;
    handleChangeName: (name:string) => void;
    clearFilters: () => void;
}

const UserFilter = ({ name,handleChangeName,clearFilters }:Props) => {
    
    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar Usuários"
                    onChange={event => handleChangeName(event.target.value)}
                    value={name}
                />
                <SearchIcon />
            </div>
            
            <button 
                    className="btn btn-outline-secondary"
                    onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default UserFilter;