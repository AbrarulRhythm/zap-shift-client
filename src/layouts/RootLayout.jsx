import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import NavBar from '../pages/Shared/NavBar/NavBar';

const RootLayout = () => {
    return (
        // Mian Wrapper
        <div className='main-wrapper'>
            {/* Header */}
            <header>
                <NavBar></NavBar>
            </header>
            {/* Header End */}

            {/* ========== Mian Start ========== */}
            <main className='site-main'>
                <Outlet></Outlet>
            </main>
            {/* ========== Mian End ========== */}

            {/* Footer */}
            <footer>
                <Footer></Footer>
            </footer>
            {/* Footer End */}
        </div>
        // Main Wrapper End
    );
};

export default RootLayout;