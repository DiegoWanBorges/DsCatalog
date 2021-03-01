import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
type FormState = {
    name: string;
    price: string;
    imgUrl: string;
    description: string
}
type ParamsType = {
    productId: string;
}


const ProductForm = () => {
    const { register, handleSubmit, errors,setValue } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !=='create';

    useEffect(() => {

        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name',response.data.name)
                    setValue('description',response.data.description)
                    setValue('price',response.data.price)
                    setValue('imgUrl',response.data.imgUrl)
                })
            }
    }, [productId,isEditing,setValue])

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            url: isEditing ? `/products/${productId}`: '/products/',
            method: isEditing ? 'PUT': 'POST',
            data: data
        })
            .then(() => {
                toast.success("Produto salvo com sucesso!")
                history.push('/admin/products')
            })
            .catch(() => {
                toast.error("Erro ao salvar produto!")
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}  >
            <BaseForm tittle= {isEditing ? 'EDITAR PRODUTO': 'CADASTRAR PRODUTO'}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                type="text"
                                name="name"
                                className={`form-control imput-base ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Nome do produto"
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: "O campo deve ter minímo 5 caracteres" },
                                    maxLength: { value: 60, message: "O campo deve ter no maximo 60 caracteres" },
                                })}
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                type="number"
                                className={`form-control imput-base ${errors.price ? 'is-invalid' : ''}`}
                                name="price"
                                placeholder="Digite o preço do produto"
                                ref={register({ required: "Campo obrigatório" })}
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input
                                type="text"
                                className={`form-control imput-base ${errors.imgUrl ? 'is-invalid' : ''}`}
                                name="imgUrl"
                                placeholder="Imagem"
                                ref={register({ required: "Campo obrigatório" })}
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>

                    </div>


                    <div className="col-6">
                        <textarea
                            className={`form-control imput-base ${errors.description ? 'is-invalid' : ''}`}
                            name="description"
                            placeholder="Descrição"
                            cols={30}
                            rows={10}
                            ref={register({ required: "Campo obrigatório" })}
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default ProductForm;