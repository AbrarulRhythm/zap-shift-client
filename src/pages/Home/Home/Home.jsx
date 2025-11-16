import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';

const Home = () => {
    return (
        <>
            <section className='hero-section'>
                <div className='container'>
                    <Banner></Banner>
                </div>
            </section>

            <section>
                <div className='container'>
                    <Brands></Brands>
                </div>
            </section>
        </>
    );
};

export default Home;