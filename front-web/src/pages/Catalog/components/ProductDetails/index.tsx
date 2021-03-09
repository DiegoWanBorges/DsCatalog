import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg'

import ProductPrice from 'core/components/ProductPrice'
import { makeRequest } from 'core/utils/request'
import { Product } from 'core/types/Product'
import ProductInfoLoader from '../Loaders/ProductInfoLoader'
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
type ParamsType = {
    productId: string;
}

const ProductDetails = () => {
    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        makeRequest({ url: `/products/${productId}` })
            .then(response => setProduct(response.data))
            .finally(() => setIsLoading(false))
    }, [productId])

    const convertDescriptionAsEditorState = (description?: string) => {
        const contentState = stateFromHTML(description || '');
        return EditorState.createWithContent(contentState);
    }
    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">VOLTAR</h1>
                </Link>
                <div className="product-details-info">
                        {isLoading ? <ProductInfoLoader /> :
                            <>
                                <div className="product-details-card text-center">
                                    <img src={product?.imgUrl} alt="" className="product-details-image" />
                                </div>
                                <div className="product-info-fields">
                                    <h1 className="product-details-name">
                                        {product?.name}
                                    </h1> 
                                    {product?.price && <ProductPrice price={product?.price} />
                                    }
                                </div>

                            </>
                        }
                    

                    <div className="product-details-card">
                        {isLoading ? <ProductDescriptionLoader /> :
                            <>
                                <h1 className="product-description-title">
                                    Descrição do Produto:
                                </h1>

                                <Editor
                                    editorClassName="product-description-text"
                                    editorState={convertDescriptionAsEditorState(product?.description)}
                                    toolbarHidden
                                    readOnly
                                />
                            </>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
