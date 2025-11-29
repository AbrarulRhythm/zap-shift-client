import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Handle Resistation
    const handleRegistation = (data) => {

        const profileImage = data.photo[0]

        createUser(data.email, data.password)
            .then((result) => {
                // Store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImage);
                const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(imageAPI_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // Create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        axiosSecure.post('/users', userInfo)
                            .then(() => {
                                // User created — no UI message needed
                                // silently succeed
                            })

                        // Update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                reset(); // reset form
                                const user = result.user;
                                navigate(location?.state || '/');
                                toast.success(`Dear ${user.displayName}, your account has been successfully created 🎉`);
                            })
                            .catch(error => {
                                toast.error(error.message);
                            })
                    })
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <div className='regoster-form'>
            <title>Sign up for Zap Shift</title>

            <div className='mb-6'>
                <h1 className='text-4xl lg:text-[40px] font-extrabold text-dark-13 mb-1'>Create an Account</h1>
                <p className='text-dark-8 font-medium'>Register with ZapShift</p>
            </div>
            <form onSubmit={handleSubmit(handleRegistation)}>
                {/* Image Field */}
                <div className='mb-5'>
                    <input type="file" {...register('photo', {
                        required: 'Photo is required',
                    })} className={`${errors.photo ? 'border-red-500 text-red-500 focus:border-red-500' : 'border-[#CBD5E1] text-dark-8 focus:border-theme-primary'} border file-input w-full focus:outline-0`} />
                    <span className={`${errors.photo ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.photo && errors.photo.message}</span>
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
            <h5 className='text mt-3 text-base font-medium'>Already have an account? <Link to='/login' state={location.state} className='text-theme-primary hover:underline'>Login</Link></h5>
            <SocialLogin text='Sign up with Google'></SocialLogin>
        </div>
    );
};

export default Register;