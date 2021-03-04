import { makePrivateRequest } from "core/utils/request"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import BaseForm from "../../BaseForm"
import './styles.scss'

export type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordRepeat: string;
}
type ParamsType = {
    userId: string;
}

const UserForm = () => {
    const { register, handleSubmit, errors, setValue,getValues } = useForm<FormState>();
    const history = useHistory();
    const {  userId } = useParams<ParamsType>();
    const isEditing = userId !== 'create';

    useEffect(() => {
        if (isEditing) {
            makePrivateRequest({ url: `/users/${userId}` })
                .then(response => {
                    setValue('firstName', response.data.firstName);
                    setValue('lastName', response.data.lastName);
                    setValue('email', response.data.email);
                    setValue('password', "12345678");
                    setValue('passwordRepeat', "12345678");
                })
        }
    }, [userId, isEditing, setValue])

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            url: isEditing ? `/users/${userId}` : '/users/',
            method: isEditing ? 'PUT' : 'POST',
            data: data
        })
            .then(() => {
                toast.success("Usuário salvo com sucesso!")
                history.push('/admin/users')
            })
            .catch(() => {
                toast.error("Erro ao salvar usuário!")
            })
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}  >
            <BaseForm tittle="CADASTRAR UM USUÁRIO">

                <div className="row">
                    <div className="col-6">
                        <input
                            type="text"
                            name="firstName"
                            className={`form-control imput-base ${errors.firstName ? 'is-invalid' : ''}`}
                            placeholder="Nome"
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 2, message: "O campo deve ter minímo 2 caracteres" },
                                maxLength: { value: 20, message: "O campo deve ter no maximo 20 caracteres" },
                            })}
                        />
                        {errors.firstName && (
                            <div className="invalid-feedback d-block">
                                {errors.firstName.message}
                            </div>
                        )}
                    </div>
                    <div className="col-6">
                        <input
                            name="lastName"
                            className={`form-control imput-base ${errors.lastName ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder="Sobrenome"
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 5, message: "O campo deve ter minímo 5 caracteres" },
                                maxLength: { value: 60, message: "O campo deve ter no maximo 60 caracteres" },
                            })}
                        />
                        {errors.lastName && (
                            <div className="invalid-feedback d-block">
                                {errors.lastName?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 d-flex">
                        <input
                            type="email"
                            name="email"
                            className={`form-control imput-base ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 5, message: "O campo deve ter minímo 5 caracteres" },
                                maxLength: { value: 60, message: "O campo deve ter no maximo 60 caracteres" },
                            })}
                        />
                        {errors.email && (
                            <div className="invalid-feedback d-block">
                                {errors.email?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="row mt-4" >
                    <div className="col-6 ">
                        <input
                            type="password"
                            name="password"
                            className={`form-control imput-base ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Digite sua senha"
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 6, message: "O campo deve ter minímo 6 caracteres" },
                                maxLength: { value: 20, message: "O campo deve ter no maximo 20 caracteres" },
                             })}
                        />
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password?.message}
                            </div>
                        )}
                        <small className="admin-user-form-text-password">
                            A sua senha deve ter pelo menos 8 caracteres e conter pelo menos uma número
                        </small>
                    </div>

                    <div className="col-6">
                        <input
                            type="password"
                            name="passwordRepeat"
                            className={`form-control imput-base ${errors.passwordRepeat ? 'is-invalid' : ''}`}
                            placeholder="Repita sua senha"
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 6, message: "O campo deve ter minímo 6 caracteres" },
                                maxLength: { value: 20, message: "O campo deve ter no maximo 20 caracteres" },
                                validate:{
                                    value: value=> value===getValues('password') || "As senhas não são iguais ",
                                }
                            })}
                        />
                        {errors.passwordRepeat && (
                            <div className="invalid-feedback d-block">
                                {errors.passwordRepeat?.message}
                            </div>
                        )}
                    </div>


                </div>
            </BaseForm>
        </form>
    )
}

export default UserForm;