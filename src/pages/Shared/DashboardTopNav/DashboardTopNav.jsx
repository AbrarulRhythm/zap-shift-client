import React, { useRef, useState } from 'react';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import useAuth from '../../../hooks/useAuth';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';

const DashboardTopNav = ({ sideMenuOpen, setSideMenuOpen }) => {
    const { user } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    return (
        <div className='px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center'>
            <button onClick={() => setSideMenuOpen(!sideMenuOpen)} className='cursor-pointer hover:text-dark-12 duration-150'>
                <HiOutlineBars3BottomLeft className='text-2xl' />
            </button>
            <div className='flex items-center space-x-3'>
                <button className='text-dark-12 w-10 h-10 flex items-center justify-center bg-dark-3 border border-dark-4 rounded-full cursor-pointer hover:bg-dark-5 duration-300'>
                    <IoMdNotificationsOutline className='text-xl' />
                </button>
                <div className='flex items-center space-x-2'>
                    <div>
                        <img src={user?.photoURL} className='w-10 h-10 object-cover rounded-full bg-dark-5' alt='Profile Image' />
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div>
                            <h5 className='text-base text-dark-12 font-semibold'>{user?.displayName}</h5>
                            <p className='text-sm font-medium'>Admin</p>
                        </div>
                        <div ref={menuRef} className='w-8 h-8 hover:text-dark-12 duration-150 relative'>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenu(!openMenu);
                                }}
                                className='cursor-pointer'
                            >
                                <IoIosArrowDown className='text-xl mx-auto' />
                            </div>
                            <ProfileMenu
                                menuRef={menuRef}
                                openMenu={openMenu}
                                setOpenMenu={setOpenMenu}
                            ></ProfileMenu>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashboardTopNav;