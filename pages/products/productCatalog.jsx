import React, { useEffect, useState } from 'react';
import { searchService } from '../../services/search.service';

import { Link } from '../../components/Link';



const Products = ({ searchContext }) => {
    const [products, setProducts] = useState([])


    useEffect(async () => {
        async function fetchProducts() {
            // If search filter is null means we need to fetch all products like say top 100 else use search filter
            if (searchContext != null && searchContext.filters != null) {
                return await searchService.getByFilters(searchContext)
            }
            else {
                return await searchService.getAll()
            }
        }
        const products = await fetchProducts()
        setProducts(products)
    }, [searchContext])

    return (
        <section >
            <div className="container">

                <div className="row">
                    {products != null && products ? products.map((product, index) => {
                        return (
                            <div key={index} className="mt-4 col-lg-3 col-sm-4 col-11 offset-sm-0 offset-1">
                                <div style={{ width: "100%" }} className="card">
                                    <Link href={`/products/product/${product.id}`} >
                                        <img style={{ cursor: "pointer", minHeight: "70%", marginLeft: "12.5%" }}
                                            className="card-img-top" src={product.imageUrl} alt={product.name} />
                                    </Link>
                                    <div style={{ marginLeft: "12.5%" }} className="card-body">
                                        <p style={{ fontSize: "14px", fontWeight: "bold", color: "maroon", paddingLeft: "8px", wrap: "nowrap", overflow: "hidden" }} className="card-text"> {product.name}</p>
                                        <p style={{ fontSize: "14px", fontWeight: "bold", color: "blue", paddingLeft: "8px", overflow: "hidden" }}>  Rs. {product.price}   <Link href="#" className="m-2 btn btn-sm btn-success mb-2">Add to Cart</Link></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : 'No Products to display'}
                </div>
            </div>
        </section >
    );
}

export default Products;