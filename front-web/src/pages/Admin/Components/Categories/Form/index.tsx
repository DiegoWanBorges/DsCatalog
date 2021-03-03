import BaseForm from "../../BaseForm"



const CategoryForm = () =>{
    return(
        <form>
            <BaseForm tittle="CADASTRAR UMA CATEGORIA">
                <div className="row col-6">
                    <input 
                          type="text"
                          className="form-control imput-base"
                          placeholder="Nome da categoria"
                    />
                </div>
            </BaseForm>
        </form>
    )
}

export default CategoryForm;