import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from '../../components/Link';
import { Layout } from '../../components/auth/layout';
import { userService } from '../../services/user.service';
import { alertService } from '../../services/alert.service';

export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ email, password }) {
        return userService.login(email, password)
            .then((user) => {
                console.log('user', user)
                // get return url from query parameters or default to '/'
                const returnUrl = user.role == 'ADMIN' ? '/products/Index' : '/';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div style={{ width: "300px", height: "320px" }} className="card">
                <h4 className="card-header">Login</h4>
                <div style={{ padding: "1rem" }} className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group pt-3 pb-3">
                            <button style={{ width: "270px" }} disabled={formState.isSubmitting} className="btn btn-primary">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Login
                            </button>
                        </div>
                        <div className="form-group">
                            <Link style={{ width: "270px" }} href="/auth/register" className="btn btn-secondary">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}