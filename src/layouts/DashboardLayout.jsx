import React from 'react';
import { Outlet } from 'react-router';
import SideNav from '../pages/Shared/SideNav/SideNav';

const DashboardLayout = () => {
    return (
        // Mian Wrapper
        <div className='dashboard-main-wrapper ml-[260px]'>
            {/* Top Nav */}
            <nav className='top-nav'></nav>
            {/* Top Nav End */}

            {/* Side Nav */}
            <nav className='side-nav w-[260px] fixed top-0 left-0 h-full bg-white overflow-hidden overflow-y-auto'>
                <SideNav></SideNav>
            </nav>
            {/* Side Nav End */}

            {/* ========== Mian Start ========== */}
            <main>
                <Outlet></Outlet>
            </main>
            {/* ========== Mian End ========== */}
        </div>
        // Main Wrapper End
    );
};

export default DashboardLayout;