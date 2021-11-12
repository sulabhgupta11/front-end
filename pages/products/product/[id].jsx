import TopBar from '../../../components/TopBar';
import { productService } from '../../../services/product.service';


const ProductDetails = (props) => {

    return <div>
        <TopBar />
        <div style={{ marginTop: "1rem", marginLeft: "35%", width: "400px", height: "320px" }} className="card">
            <h4 className="card-header">Product Details</h4>
            <div style={{ padding: "1rem" }} className="card-body">
                <img style={{ cursor: "pointer", minHeight: "70%", marginLeft: "12.5%" }}
                    className="card-img-top" src={props.product.imageUrl} alt={props.product.name} />
                <ul style={{ color: "blue", fontWeight: "300", fontSize: "11" }}>
                    <li >Product Name- {props.product.name}</li>
                    <li>Product Desctiption- {props.product.description}</li>
                    <li>Product Brand- {props.product.brand}</li>
                    <li>Product Category- {props.product.category}</li>
                    <li>Product Stock- {props.product.stock}</li>
                    <li>Product Price- {props.product.price}</li>
                    <li>Product Color- {props.product.color}</li>
                </ul>
            </div>
        </div>
    </div>
}

export default ProductDetails;

export async function getServerSideProps({ params }) {
    const product = await productService.getById(params.id);
    return {
        props: { product }
    }
}