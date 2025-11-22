import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { NavLink } from 'react-router';
import { RxDashboard } from 'react-icons/rx';
import { BsBoxSeam } from 'react-icons/bs';

const SideNav = () => {
    return (
        <div className='p-6'>
            <div>
                <Logo></Logo>
            </div>
            <hr className='border-t border-dark-4 my-3' />

            {/* Lavel */}
            <p className='text-sm text-dark-12 uppercase font-medium mb-3'>Menu</p>

            {/* Menu */}
            <ul className='side-nav-menu'>
                <li>
                    <NavLink to='/dashboard/overview'><RxDashboard className='text-lg' /> Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/my-parcels'><BsBoxSeam className='text-lg' /> My Parcels</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SideNav;