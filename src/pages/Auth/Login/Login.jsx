import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then((result) => {
                reset(); // reset form
                const user = result.user;
                toast.success(`Sign In successful. Welcome back, ${user.displayName}!`);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <div className='login-form'>
            <title>Zap Shift - log in or sign up</title>

            <div className='mb-6'>
                <h1 className='text-4xl lg:text-[40px] font-extrabold text-dark-13 mb-1'>Welcome Back</h1>
                <p className='text-dark-8 font-medium'>Login with ZapShift</p>
            </div>
            <form onSubmit={handleSubmit(handleLogin)}>
                {/* Email */}
                <div className='mb-3'>
                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Email</label>
                    <input type="email" {...register('email', {
                        required: 'Email is required'
                    })} className={`${errors.email ? 'border-red-500 text-red-500 focus:border-red-500' : 'border-[#CBD5E1] text-dark-8 focus:border-theme-primary'} border form-field`} placeholder='Email' />
                    <span className={`${errors.email ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.email && errors.email.message}</span>
                </div>
                {/* Password */}
                <div className='mb-3'>
                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Password</label>
                    <input type="password" {...register('password', {
                        required: 'Password is required'
                    })} className={`${errors.password ? 'border-red-500 text-red-500 focus:border-red-500' : 'border-[#CBD5E1] text-dark-8 focus:border-theme-primary'} border form-field`} placeholder='Password' />
                    <span className={`${errors.password ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.password && errors.password.message}</span>
                </div>
                <button className='button button-fill w-full login-re-button'>Login</button>
            </form>
            <h5 className='text mt-3 text-base font-medium'>Don’t have any account? <Link to='/register' className='text-theme-primary hover:underline'>Register</Link></h5>
            <div className='my-6 overflow-hidden'>
                <div className='relative font-medium text-center or-social'>OR</div>
            </div>
            {/* Google Sign In Button */}
            <button className='font-semibold flex items-center justify-center w-full gap-2.5 border border-[#CBD5E1] hover:border-theme-primary duration-200 cursor-pointer rounded-sm py-3'>
                <FcGoogle className='text-[26px]' /> Login with Google
            </button>
        </div>
    );
};

export default Login;