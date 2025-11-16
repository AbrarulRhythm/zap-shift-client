import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        // Mian Wrapper
        <div className='main-wrapper bg-white'>
            <div className='py-6 lg:py-10 px-6 lg:ps-10 absolute'>
                <Logo></Logo>
            </div>

            <div className=''>
                <div className='flex flex-wrap h-screen'>
                    <div className='w-full lg:w-6/12 flex order-2 lg:order-1'>
                        <div className='container my-auto py-12'>
                            <div className='flex flex-wrap justify-center'>
                                <div className='w-full md:w-8/12 lg:w-9/12 2xl:w-8/12'>
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-6/12 order-1 lg:order-2'>
                        <div className='bg-green-1 h-full lg:h-screen flex items-center justify-center'>
                            <div className='flex flex-wrap my-auto pb-12 py-28 lg:py-12'>
                                <img src={authImage} alt='Auth Image' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // Main Wrapper End
    );
};

export default AuthLayout;