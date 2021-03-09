import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search.svg'


type Props ={
    name?: string;
    handleChangeName: (name:string) => void;
    clearFilters: () => void;
}
 
const UserFilter = ({ name,handleChangeName,clearFilters }:Props) => {
    
    return (
        <div className="card-base user-filters-container">
            <div className="input-search-user">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar usuários"
                    onChange={event => handleChangeName(event.target.value)}
                    value={name}
                />
                <SearchIcon />
            </div>
            
            <button 
                    className="btn btn-outline-secondary user-btn-filter-clean"
                    onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default UserFilter;