import { AddEdit } from '../../../components/AddEdit';
import { productService } from '../../../services/product.service';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const product = await productService.getById(params.id);
    return {
        props: { product }
    }
}