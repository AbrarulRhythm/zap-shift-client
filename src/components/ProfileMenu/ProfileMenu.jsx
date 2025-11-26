import React, { useEffect } from 'react';
import { BsBoxes } from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { LuLayoutDashboard, LuUserRound } from 'react-icons/lu';

const ProfileMenu = ({ menuRef, openMenu, setOpenMenu }) => {
    const { user, signOutUser } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [menuRef, setOpenMenu]);

    // Handle Sign Out
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Successfully signed out! We hope to see you again soon.');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <div className={`${openMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} absolute right-0 top-[76px] w-[294px] h-auto text-sm before:content-[''] before:w-6 before:h-6  before:absolute before:-top-3 before:right-3.5 before:bg-white before:rotate-45 before:rounded-tl-sm before:border-t before:border-l before:border-dark-5 rounded-md bg-white border border-dark-5 z-50`}>
            <div className='pt-8 mb-6'>
                <img src={`${user && user.photoURL}`} className='w-11 h-11 object-cover rounded-full mx-auto mb-2' alt='User Profile Pic' />
                <h5 className='text-dark-12 text-sm font-semibold text-center'>{user && user.displayName}</h5>
            </div>
            <ul>
                <li>
                    <Link to='/' className='flex items-center px-4 py-2 gap-2 font-semibold hover:bg-gray-100'>
                        <LuUserRound className='text-lg' /> My Profile
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard/overview' className='flex items-center px-4 py-2 gap-2 font-semibold hover:bg-gray-100'>
                        <LuLayoutDashboard className='text-lg' /> Dashboard
                    </Link>
                </li>
            </ul>
            <div className='border-t-0 border border-dark-5 my-4'></div>
            <div className='px-4 pb-3'>
                <button onClick={handleSignOut} className='w-full px-3 py-3 rounded-md border border-dark-5 bg-gray-100 hover:bg-gray-200 duration-300 cursor-pointer flex items-center justify-center gap-1 font-medium'><PiSignOutBold className='text-lg' /> Sing Out</button>
            </div>
        </div>
    );
};

export default ProfileMenu;