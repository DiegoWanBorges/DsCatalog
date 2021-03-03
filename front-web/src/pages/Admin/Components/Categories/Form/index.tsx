import { Category } from "core/types/Product";
import { makePrivateRequest, makeRequest } from "core/utils/request";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm"

export type FormState = {
    name: string;
}
type ParamsType = {
    categoryId: string;
}
const CategoryForm = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { categoryId } = useParams<ParamsType>();
    const isEditing = categoryId !== 'create';

    console.log(categoryId);
    

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
                .then(response => {
                    setValue('name', response.data.name)
                    console.log(response.data.name);
                    
                })
        }
    }, [categoryId, isEditing, setValue])


    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            url: isEditing ? `/categories/${categoryId}` : '/categories/',
            method: isEditing ? 'PUT' : 'POST',
            data: data
        })
            .then(() => {
                toast.success("Categoria salva com sucesso!")
                history.push('/admin/categories')
            })
            .catch(() => {
                toast.error("Erro ao salvar categoria!")
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}  >
            <BaseForm tittle="CADASTRAR UMA CATEGORIA">
                <div className="row col-6">
                    <input
                        type="text"
                        name="name"
                        className={`form-control imput-base ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Nome da categoria"
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
            </BaseForm>
        </form>
    )
}

export default CategoryForm;