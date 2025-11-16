import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import { GoArrowUpRight } from 'react-icons/go';

const NavBar = () => {
    return (
        <div className='container'>
            <nav className='primary-menu relative py-6 lg:py-8 z-50'>
                <div className='flex items-center bg-white px-8 py-5 rounded-2xl'>
                    <div className='w-full lg:w-2/12'>
                        <Logo></Logo>
                    </div>
                    <div className='w-full lg:w-8/12'>
                        <div className='flex justify-center absolute lg:static bg-white lg:bg-transparent top-[95%] left-0 right-0 rounded-2xl border border-dark-5 lg:border-0'>
                            <ul className='flex flex-col items-center lg:flex-row p-5 lg:p-0 w-full lg:w-auto'>
                                <li>
                                    <NavLink to='/services'>Services</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/coverage'>Coverage</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/about-us'>About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/pricing'>Pricing</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/be-a-rider'>Be a Rider</NavLink>
                                </li>
                                <div className='block lg:hidden mt-4 w-full text-center'>
                                    <div className='space-y-2 flex flex-col'>
                                        <Link to='/' className='button button-outline w-full'>Sign In</Link>
                                        <Link to='/' className='button button-fill w-full'>Sign Up</Link>
                                    </div>
                                    <Link to='/' className='w-12 h-12 flex justify-center items-center text-2xl rounded-full mx-auto mt-4 bg-dark-12 text-theme-primary hover:bg-theme-primary hover:text-dark-12 duration-300'>
                                        <GoArrowUpRight />
                                    </Link>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className='w-full lg:w-4/12'>
                        <div className='hidden lg:flex justify-end items-center'>
                            <div className='space-x-4'>
                                <Link to='/' className='button button-outline'>Sign In</Link>
                                <Link to='/' className='button button-fill'>Sign Up</Link>
                            </div>
                            <Link to='/' className='w-12 h-12 flex justify-center items-center text-2xl rounded-full bg-dark-12 text-theme-primary hover:bg-theme-primary hover:text-dark-12 duration-300'>
                                <GoArrowUpRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;