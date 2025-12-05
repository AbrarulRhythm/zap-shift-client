import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import { RxDashboard } from 'react-icons/rx';
import { BsBoxSeam } from 'react-icons/bs';
// import logo from '../../../assets/logo.png'
import { LuHistory } from "react-icons/lu";
import { RiEBike2Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import useRole from '../../../hooks/useRole';
import { TbTruckDelivery } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { MdOutlineTaskAlt } from 'react-icons/md';


const SideNav = ({ sideMenuOpen }) => {
    const { role, isLoading } = useRole();

    return (
        <div className={`${sideMenuOpen ? 'py-6 px-3' : 'p-6'} duration-300`}>
            <div>
                <Logo></Logo>
            </div>
            <hr className='border-t border-dark-4 my-3' />

            {/* Lavel */}
            <p className='text-sm text-dark-12 uppercase font-medium mb-3'>Menu</p>

            {/* Menu */}
            <ul className='side-nav-menu'>
                <li>
                    <NavLink to='/dashboard/overview' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                        <RxDashboard className='text-lg' /> <span className={sideMenuOpen ? 'lg:hidden' : 'block'}>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/my-parcels' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                        <BsBoxSeam className='text-lg' /> <span className={`${sideMenuOpen ? 'lg:hidden' : 'block'}`}>My Parcels</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/payment-history' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                        <LuHistory className='text-xl' /> <span className={`${sideMenuOpen ? 'lg:hidden' : 'block'}`}>Payment History</span>
                    </NavLink>
                </li>

                {/* 🔥 Loading state for role */}
                {isLoading && (
                    <>
                        <li>
                            <div className="skeleton py-4 w-full"></div>
                        </li>
                        <li>
                            <div className="skeleton py-4 w-full"></div>
                        </li>
                        <li>
                            <div className="skeleton py-4 w-full"></div>
                        </li>
                        <li>
                            <div className="skeleton py-4 w-full"></div>
                        </li>
                    </>
                )}

                {/* Rider Only Routes */}
                {
                    role === 'rider' && <>
                        <li>
                            <NavLink to='/dashboard/assigned-deliveries' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                                <FaTasks className='text-xl' /> <span className={`${sideMenuOpen ? 'lg:hidden' : 'block'}`}>Assigned Deliveries</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/completed-deliveries' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                                <MdOutlineTaskAlt className='text-xl' /> <span className={`${sideMenuOpen ? 'lg:hidden' : 'block'}`}>Completed Deliveries</span>
                            </NavLink>
                        </li>
                    </>
                }

                {/* Admin Only Routes */}
                {
                    role === 'admin' && <>
                        <li>
                            <NavLink to='/dashboard/approve-riders' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                                <RiEBike2Line className='text-xl' /> <span className={`${sideMenuOpen ? 'lg:hidden' : 'block'}`}>Approve Riders</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/assign-riders' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                                <TbTruckDelivery className='text-xl' /> <span className={`${sideMenuOpen ? 'lg:hidden' : 'block'}`}>Assign Riders</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/users-management' className={`${sideMenuOpen ? 'lg:justify-center' : 'justify-start'} duration-200`}>
                                <FiUsers className='text-xl' /> <span className={`${sideMenuOpen ? 'lg:hidden' : 'block'}`}>Users Management</span>
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </div>
    );
};

export default SideNav;