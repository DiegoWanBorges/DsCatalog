import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss'
import { Category } from 'core/types/Product';
import CurrencyInput from 'react-currency-input-field';
import ImageUpload from '../ImageUpload';
import DescriptionFilter from './DescriptionFilter';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {stateFromHTML} from 'draft-js-import-html';
export type FormState = {
    name: string;
    price: string;
    description: EditorState; 
    categories: Category[];
}
type ParamsType = {
    productId: string;
}

const ProductForm = () => {
    const { register, handleSubmit, errors,setValue,control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories,setIsLoadingCategories] =useState(false);
    const [categories,setCategories] = useState<Category[]>([]);
    const isEditing = productId !=='create';
    const [uploadedImgUrl,setUploadedImgUrl] = useState('');
    const [productImgUrl,setProductImgUrl] = useState('');
    
    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {

                    setValue('name',response.data.name)
                    setValue('price',response.data.price)
                    setValue('categories',response.data.categories)
                    setProductImgUrl(response.data.imgUrl)
                    setValue('description',convertDescriptionAsEditorState(response.data.description))
                })
            }
    }, [productId,isEditing,setValue])

    useEffect(() => {
            setIsLoadingCategories(true);
            makeRequest({ url: `/categories/` })
                .then(response => {
                    setCategories(response.data.content)
                })
                .finally(() =>{
                    setIsLoadingCategories(false);
                })
    }, [])

    const getDescriptionFromEditor =(editorState: EditorState) =>{
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    const convertDescriptionAsEditorState=(description: string) =>{
        const contentState = stateFromHTML(description);
        return EditorState.createWithContent(contentState);
    }

    const onSubmit = (data: FormState) => {
        const payload ={
            ...data,
            description: getDescriptionFromEditor(data.description),
            imgUrl:uploadedImgUrl || productImgUrl
        }
        makePrivateRequest({
            url: isEditing ? `/products/${productId}`: '/products/',
            method: isEditing ? 'PUT': 'POST',
            data: payload
        })
            .then(() => {
                toast.success("Produto salvo com sucesso!")
                history.push('/admin/products')
            })
            .catch(() => {
                toast.error("Erro ao salvar produto!")
            })
    }

    const onUploadSuccess =(imgUrl: string) => {
            setUploadedImgUrl(imgUrl);
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
                            <Controller
                                as={ Select }
                                name="categories"
                                rules={{required:true}}
                                control={control}
                                isLoading={isLoadingCategories}
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id) }
                                classNamePrefix="categories-select"
                                isMulti
                                placeholder="Categoria"                             
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <Controller
                                name="price"
                                defaultValue=""
                                control={control}
                                rules={{required:"Campo obrigatório"}}
                                render={({value,onChange}) =>(
                                    <CurrencyInput
                                        placeholder="Preço"
                                        className={`form-control imput-base ${errors.price ? 'is-invalid' : ''}`}
                                        value={value}
                                        intlConfig={{locale:'pt-BR',currency:'BRL'}}
                                        onValueChange={onChange}
                                        groupSeparator=","
                                        decimalSeparator="."
                                        
                                        />
                                )}
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <ImageUpload 
                                        onUploadSuccess={onUploadSuccess}
                                        productImgUrl={productImgUrl}
                            />
                        </div>

                    </div>


                    <div className="col-6">
                        <DescriptionFilter
                            control={control}
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default ProductForm;