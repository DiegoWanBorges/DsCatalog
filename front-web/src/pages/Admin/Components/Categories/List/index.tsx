import history from 'core/utils/history';
import CategoryCard from '../Card';
import './styles.scss'

const CategoryList = () => {

    const handCreate = () => {
        history.push("/admin/categories/create");
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
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>

        </div>
    )
}

export default CategoryList;