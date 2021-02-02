import React, { useState } from 'react'
import BaseForm from '../../BaseForm';
import './styles.scss'

type FormState ={
    name:string;
    price:string;
    category:string;
}

const ProductForm = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price:'',
        category:''
    });
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]:value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}  > 
        <BaseForm tittle="CADASTRAR PRODUTO">
            <div className="row">
            <div className="col-6">
                    <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          className="form-control mb-5" 
                          onChange={handleOnChange}
                          placeholder="Nome do produto"
                    />
                    
                    <select 
                        className="form-control mb-5" 
                        onChange={handleOnChange}
                        name="category"
                        value={formData.category}
                        >
                        <option value="livros">Livros</option>
                        <option value="computadores">Computadores</option>
                        <option value="eletronicos">Eletronicos</option>
                    </select>

                    <input 
                          type="text" 
                          className="form-control mb-5" 
                          name="price"
                          value={formData.price}
                          onChange={handleOnChange}
                          placeholder="Digite o preço do produto"
                    />
                </div>
            </div>
        </BaseForm>
        </form>
    )
}

export default ProductForm;