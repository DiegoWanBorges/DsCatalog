import { Category } from "core/types/Product";
import { Link } from "react-router-dom";
import './styles.scss'

type Props = {
    category: Category;
    onRemove: (productId: number) => void;
}

const CategoryCard = ({ category, onRemove }: Props) => {
    return (
        <div className="card-base category-card-admin" >
            <div className="row col-6 ">
                <h3 className="category-card-name-admin">
                    {category.name}
                </h3>
            </div>

            <div className="category-buttons-container">
                <Link
                    to={`/admin/categories/${category.id}`}
                    type="button"
                    className="btn btn-outline-secondary   btn-category">
                    EDITAR
                </Link>
            
                <button
                    type="button"
                    className="btn btn-outline-danger  btn-category"
                    onClick={() => onRemove(category.id)}
                >
                    EXCLUIR
                    </button>
            </div>
        </div>
    )
}

export default CategoryCard;