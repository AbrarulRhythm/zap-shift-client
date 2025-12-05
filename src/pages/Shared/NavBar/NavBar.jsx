import React, { useRef, useState } from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import { GoArrowUpRight } from 'react-icons/go';
import useAuth from '../../../hooks/useAuth';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const NavBar = () => {
    const { user } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);
    const [openNavMenu, setOpenNavMenu] = useState(false);

    return (
        <div className='container'>
            <nav className='primary-menu relative py-6 lg:py-8 z-50'>
                <div className='flex items-center bg-white px-6 md:px-8 py-5 rounded-2xl'>
                    <div className='w-full lg:w-2/12'>
                        <Logo></Logo>
                    </div>
                    <div className='w-full lg:w-8/12'>
                        <div className={`${openNavMenu ? 'translate-y-0 visible opacity-100' : '-translate-y-4 lg:translate-y-0 invisible lg:visible opacity-0 lg:opacity-100'} duration-300 flex lg:opacity-100 justify-center absolute lg:static bg-white lg:bg-transparent top-[95%] left-0 right-0 rounded-2xl border border-dark-5 lg:border-0`}>
                            <ul className='flex flex-col items-center lg:flex-row p-5 lg:p-0 w-full lg:w-auto nav-menu'>
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
                                    <NavLink to='/send-parcel'>Send Parcle</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/pricing'>Pricing</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/parcel-track'>Track Order</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/rider'>Be a Rider</NavLink>
                                </li>
                                {!user && (
                                    <div className='block lg:hidden mt-4 w-full text-center'>
                                        <div className='space-y-2 flex flex-col'>
                                            <Link to='/login' className='button button-outline w-full'>Sign In</Link>
                                            <Link to='/register' className='button button-fill w-full'>Sign Up</Link>
                                        </div>
                                        <Link to='/' className='w-12 h-12 flex justify-center items-center text-2xl rounded-full mx-auto mt-4 bg-dark-12 text-theme-primary hover:bg-theme-primary hover:text-dark-12 duration-300'>
                                            <GoArrowUpRight />
                                        </Link>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='w-full lg:w-4/12'>
                        <div className='flex justify-end items-center'>
                            <button onClick={() => setOpenNavMenu(!openNavMenu)} className='flex lg:hidden w-10 h-10 bg-theme-primary text-dark-13 items-center justify-center rounded-sm mr-4'>
                                {openNavMenu ? <IoMdClose className='text-[22px]' /> : <FaBars className='text-lg' />}
                            </button>

                            {
                                user ? (
                                    <div ref={menuRef} className='relative'>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenu(!openMenu);
                                            }}
                                            className='cursor-pointer w-14 h-14'>
                                            <img src={`${user && user.photoURL}`} className='w-14 h-14 rounded-full object-cover bg-gray-300' alt="" />
                                        </div>
                                        <ProfileMenu
                                            menuRef={menuRef}
                                            openMenu={openMenu}
                                            setOpenMenu={setOpenMenu}
                                        ></ProfileMenu>
                                    </div>
                                ) : (
                                    <>
                                        <div className='space-x-4'>
                                            <Link to='/login' className='button button-outline'>Sign In</Link>
                                            <Link to='/register' className='button button-fill'>Sign Up</Link>
                                        </div>
                                        <Link to='/' className='w-12 h-12 flex justify-center items-center text-2xl rounded-full bg-dark-12 text-theme-primary hover:bg-theme-primary hover:text-dark-12 duration-300'>
                                            <GoArrowUpRight />
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;