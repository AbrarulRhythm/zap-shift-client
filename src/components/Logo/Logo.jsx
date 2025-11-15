import React from 'react';

import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = ({ logoColor = 'text-gray-800' }) => {
    return (
        <>
            <Link to='/' title='Zap Ship' className='flex items-end hover:opacity-65 duration-300'>
                <img src={logo} alt='Header Logo' />
                <h3 className={`${logoColor} text-[32px] font-extrabold -ms-3 leading-6`}>ZapShift</h3>
            </Link>
        </>
    );
};

export default Logo;