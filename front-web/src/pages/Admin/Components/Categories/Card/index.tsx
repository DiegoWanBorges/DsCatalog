import { Link } from "react-router-dom";
import './styles.scss'

const CategoryCard = () => {
    return (
        <div className="card-base category-card-admin" >
            <div className="row col-6 ">
                <h3 className="category-card-name-admin  py-4"> 
                    Nome da Categoria
                </h3>
            </div>

            <div className="col-3 pt-3 pr-5 ">
                <Link
                    to={`/admin/categories/1`}
                    type="button"
                    className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit">
                    EDITAR
                </Link>
            </div>

            <div className="col-3 pt-3 pr-5 ">
                <button
                    type="button"
                    className="btn btn-outline-danger btn-block border-radius-10"
                >
                    EXCLUIR
                    </button>
                </div>
        </div>
    )
}

export default CategoryCard;