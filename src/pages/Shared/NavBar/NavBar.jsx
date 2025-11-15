import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { NavLink } from 'react-router';

const NavBar = () => {
    return (
        <div className='container'>
            <nav className='primary-menu relative py-6 lg:py-8'>
                <div className='flex items-center bg-white px-8 py-5 rounded-2xl'>
                    <div className='w-full lg:w-2/12'>
                        <Logo></Logo>
                    </div>
                    <div className='w-full lg:w-8/12'>
                        <div className='flex justify-center absolute lg:static bg-white lg:bg-transparent top-[95%] left-0 right-0 rounded-2xl'>
                            <ul className='flex flex-col items-center lg:flex-row p-5 lg:p-0'>
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
                            </ul>
                        </div>
                    </div>
                    <div className='w-full lg:w-2/12'>
                        <div className='flex justify-end'>
                            hello3
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;