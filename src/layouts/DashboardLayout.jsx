import React from 'react';
import { Outlet } from 'react-router';
import SideNav from '../pages/Shared/SideNav/SideNav';
import DashboardTopNav from '../pages/Shared/DashboardTopNav/DashboardTopNav';

const DashboardLayout = () => {
    return (
        // Mian Wrapper
        <div className='dashboard-main-wrapper ml-0 lg:ml-[260px] mt-[76px]'>
            {/* Top Nav */}
            <nav className='top-nav fixed top-0 bg-white right-0 left-0 ml-0 lg:ml-[260px]'>
                <DashboardTopNav></DashboardTopNav>
            </nav>
            {/* Top Nav End */}

            {/* Side Nav */}
            <nav className='side-nav w-[260px] fixed top-0 -left-[260px] lg:left-0 h-full bg-white overflow-hidden overflow-y-auto'>
                <SideNav></SideNav>
            </nav>
            {/* Side Nav End */}

            {/* ========== Mian Start ========== */}
            <main className='p-4 md:p-6 lg:p-8'>
                <Outlet></Outlet>
            </main>
            {/* ========== Mian End ========== */}
        </div>
        // Main Wrapper End
    );
};

export default DashboardLayout;