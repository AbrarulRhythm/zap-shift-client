import React, { useState } from 'react';
import { Outlet } from 'react-router';
import SideNav from '../pages/Shared/SideNav/SideNav';
import DashboardTopNav from '../pages/Shared/DashboardTopNav/DashboardTopNav';

const DashboardLayout = () => {
    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    return (
        // Mian Wrapper
        <div className={`${sideMenuOpen ? 'lg:ml-20' : 'lg:ml-[260px]'} duration-300 dashboard-main-wrapper ml-0 mt-[76px]`}>
            {/* Top Nav */}
            <nav className={`${sideMenuOpen ? 'lg:ml-20' : 'lg:ml-[260px]'} duration-300 top-nav fixed top-0 bg-white right-0 left-0 ml-0`}>
                <DashboardTopNav
                    sideMenuOpen={sideMenuOpen}
                    setSideMenuOpen={setSideMenuOpen}
                ></DashboardTopNav>
            </nav>
            {/* Top Nav End */}

            {/* Side Nav */}
            <nav className={`${sideMenuOpen ? 'left-0 shadow-2xl lg:shadow-none w-[260px] lg:w-20' : '-left-[260px] w-[260px]'} duration-300 bg-white side-nav fixed top-0 lg:left-0 h-full  overflow-hidden overflow-y-auto z-50`}>
                <SideNav
                    sideMenuOpen={sideMenuOpen}
                ></SideNav>
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