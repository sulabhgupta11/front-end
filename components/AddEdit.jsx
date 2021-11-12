import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from './Link';
import * as Yup from 'yup';

import { productService } from '../services/product.service';

import { alertService } from '../services/alert.service';

const AddEdit = (props) => {
    const product = props?.product;
    console.log('product', product)
    const isAddMode = !product;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Product Name is required'),
        brand: Yup.string()
            .required('Brand is required'),
        category: Yup.string()
            .required('Category is required'),
        stock: Yup.string()
            .required('Stock is required'),
        price: Yup.string()
            .required('Price is required'),
        color: Yup.string()
            .required('Color is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if user passed in props
    if (!isAddMode) {
        const { name, category, brand, color, stock, price, description } = product;
        formOptions.defaultValues = product;
    }


    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? addProduct(data)
            : updateProduct(data);
    }

    function addProduct(data) {
        return productService.addProduct({ product: data, requestId: "dummy" })
            .then(() => {
                alertService.success('Product added', { keepAfterRouteChange: true });
                router.push('/products/Index');
            })
            .catch(alertService.error);
    }

    function updateProduct(data) {
        return productService.updateProduct({ product: data, requestId: "dummy" })
            .then(() => {
                alertService.success('Product updated', { keepAfterRouteChange: true });
                router.push('/products/Index');
            })
            .catch(alertService.error);
    }




    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>
            <div style={{ marginLeft: "30%" }} className="form-row">
                <div className="p-1 form-group col-5">
                    <label>Name</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="p-1 form-group col-5">
                    <label>Category</label>
                    <select name="category" {...register('category')} className={`form-control ${errors.category ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Mobile">Mobile</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Ipad">Ipad</option>
                    </select>
                    <div className="invalid-feedback">{errors.category?.message}</div>
                </div>
                <div className="p-1 form-group col-5">
                    <label>Brand</label>
                    <select name="brand" {...register('brand')} className={`form-control ${errors.brand ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="RealMe">RealMe</option>
                        <option value="Redmi">Redmi</option>
                        <option value="Vivo">Vivo</option>
                    </select>
                    <div className="invalid-feedback">{errors.brand?.message}</div>
                </div>
                <div className="p-1 form-group col-5">
                    <label>Color</label>
                    <select name="color" {...register('color')} className={`form-control ${errors.color ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Red">Red</option>
                        <option value="Yellow">Yellow</option>
                        <option value="White">White</option>
                    </select>
                    <div className="invalid-feedback">{errors.color?.message}</div>
                </div>
                <div className="p-1 form-group col-5">
                    <label>Stock</label>
                    <input name="stock" type="text" {...register('stock')} className={`form-control ${errors.stock ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.stock?.message}</div>
                </div>
                <div className="p-1 form-group col-5">
                    <label>Price</label>
                    <input name="price" type="text" {...register('price')} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
                <div className="p-1 form-group col-5">
                    <label>Description</label>
                    <input name="description" type="textarea" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>

            <div style={{ marginLeft: "30%" }} className="p-1 form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary col-5">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
            </div>

            <div style={{ marginLeft: "30%", paddingTop: "1rem" }} className="form-group">
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary col-5">Reset</button>
                <Link href="/products/Index" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };