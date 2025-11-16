import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleRegistation = (data) => {
        console.log(data);
    }

    return (
        <div className='regoster-form'>
            <div className='mb-6'>
                <h1 className='text-4xl lg:text-[40px] font-extrabold text-dark-13 mb-1'>Create an Account</h1>
                <p className='text-dark-8 font-medium'>Register with ZapShift</p>
            </div>
            <form onSubmit={handleSubmit(handleRegistation)}>
                <div className='mb-5'>
                    Image
                </div>
                {/* Name */}
                <div className='mb-3'>
                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Name</label>
                    <input type="text" {...register('name', {
                        required: 'Name is required',
                    })} className={`${errors.name ? 'border-red-500 text-red-500 focus:border-red-500' : 'border-[#CBD5E1] text-dark-8 focus:border-theme-primary'} border form-field`} placeholder='Name' />
                    <span className={`${errors.name ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.name && errors.name.message}</span>
                </div>
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
                        required: 'Password is required',
                        validate: {
                            minLength: (value) =>
                                value.length >= 6 || "Must be at least 6 characters",
                            hasUppercase: (value) =>
                                /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                            hasLowercase: (value) =>
                                /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                            hasSpecialChar: (value) =>
                                /[^A-Za-z0-9]/.test(value) || "Must contain at least one special character",
                        }
                    })} className={`${errors.password ? 'border-red-500 text-red-500 focus:border-red-500' : 'border-[#CBD5E1] text-dark-8 focus:border-theme-primary'} border form-field`} placeholder='Password' />
                    <span className={`${errors.password ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.password && errors.password.message}</span>
                </div>
                <button className='button button-fill w-full login-re-button'>Register</button>
            </form>
        </div>
    );
};

export default Register;