import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react'
import BaseForm from '../../BaseForm';
import './styles.scss'

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string
}

const ProductForm = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description:'',
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payLoad = {
            ...formData,
            imgUrl: 'https://images7.kabum.com.br/produtos/fotos/115737/console-sony-playstation-5-midia-fisica_1598984720_g.jpg',
            categories: [{
                id: formData.category
            }]
        }
        makePrivateRequest({ url: '/products', method: 'POST', data: payLoad });
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
                            value={formData.category}
                            name="category"
                        >
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletronicos</option>
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
                    <div className="col-6">
                        <textarea
                            className="form-control"
                            name="description"
                            onChange={handleOnChange}
                            value={formData.category}
                            cols={30}
                            rows={10}

                        />

                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default ProductForm;