import { Category } from "core/types/Product";
import { Link } from "react-router-dom";
import './styles.scss'

type Props ={
    category: Category;
    onRemove: (productId:number) =>void;
}

const CategoryCard = ({ category, onRemove }:Props) => {
    return (
        <div className="card-base category-card-admin" >
            <div className="row col-6 ">
                <h3 className="category-card-name-admin  py-4"> 
                    {category.name}
                </h3>
            </div>

            <div className="col-3 pt-3 pr-5 ">
                <Link
                    to={`/admin/categories/${category.id}`}
                    type="button"
                    className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit">
                    EDITAR
                </Link>
            </div>

            <div className="col-3 pt-3 pr-5 ">
                <button
                    type="button"
                    className="btn btn-outline-danger btn-block border-radius-10"
                    onClick={()=> onRemove(category.id)}
                >
                    EXCLUIR
                    </button>
                </div>
        </div>
    )
}

export default CategoryCard;