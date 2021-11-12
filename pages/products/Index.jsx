import { useState, useEffect } from 'react';
import TopBar from "../../Components/TopBar";
import { Link } from '../../components/Link';
import { productService } from '../../services/product.service';
import { searchService } from '../../services/search.service';

export default Index;

function Index() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        productService.getAll().then(x => setProducts(x));
    }, []);

    function deleteProduct(product) {
        setProducts(products.map(x => {
            if (x.id === product.id) { x.isDeleting = true; }
            return x;
        }));
        productService.deleteProduct({ product: product, requestId: 'dummy' }).then(() => {
            setProducts(products => products.filter(x => x.id !== product.id));
        });
    }

    return (
        <div>
            <TopBar />
            <h1>Manage Products</h1>
            <Link href="/products/add" className="m-2 btn btn-sm btn-success mb-2">Add Product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Id</th>
                        <th style={{ width: '15%' }}>Name</th>
                        <th style={{ width: '10%' }}>Category</th>
                        <th style={{ width: '10%' }}>Brand</th>
                        <th style={{ width: '10%' }}>Color</th>
                        <th style={{ width: '10%' }}>Stock</th>
                        <th style={{ width: '10%' }}>Price</th>
                        <th style={{ width: '10%' }}>Description</th>
                        <th style={{ width: '15%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product =>
                        <tr style={{ fontSize: 12, color: "blue", fontWeight: "bold" }} key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.color}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/products/edit/${product.id}`} style={{ marginLeft: "1rem", marginRight: "2rem" }} className="btn btn-sm btn-primary ">Edit</Link>
                                <button onClick={() => deleteProduct(product)} className="btn btn-sm btn-danger btn-delete-user" disabled={product.isDeleting}>
                                    {product.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {products && !products.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Products To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}