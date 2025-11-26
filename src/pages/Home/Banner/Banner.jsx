import React from 'react';
import bigDeliveryman from '../../../assets/big-deliveryman.png';
import fastestDelivery from '../../../assets/fastestDelivery.png';
import deliveryTime from '../../../assets/deliveryTime.png';
import tinyDeliveryman from '../../../assets/tiny-deliveryman.png';
import { Link } from 'react-router';
import { GoArrowUpRight } from 'react-icons/go';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='bg-white p-10 md:p-20 rounded-4xl overflow-hidden'>
            <div className='slider-container'>
                <Slider {...settings}>
                    <div>
                        <div className='flex flex-col lg:flex-row items-center justify-between'>
                            {/* Banner Left Side Content */}
                            <div>
                                <img src={tinyDeliveryman} className='mb-4' alt="Deliveryman" />
                                <h1 className='text-blue-10 text-[34px] lg:text-[48px] 2xl:text-[56px] font-extrabold lg:max-w-[500px] 2xl:max-w-[600px] leading-[1.2] mb-4'>We Make Sure Your <span className='text-theme-primary'>Parcel Arrives</span> On Time – No Fuss.</h1>
                                <p className='max-w-[629px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                                <div className='mt-8 flex flex-col md:flex-row items-start md:items-center gap-4'>
                                    <div className='flex items-center'>
                                        <Link to='/' className='button button-fill button-rounded-full'>Track Your Parcel</Link>
                                        <Link to='/' className='w-12 h-12 flex justify-center items-center text-2xl rounded-full bg-dark-12 text-theme-primary hover:bg-theme-primary hover:text-dark-12 duration-300'>
                                            <GoArrowUpRight />
                                        </Link>
                                    </div>
                                    <Link to='/' className='button button-outline'>Be A Rider</Link>
                                </div>
                            </div>

                            {/* Banner Right Side Image */}
                            <div className='mt-10 lg:mt-0'>
                                <img src={bigDeliveryman} alt="bigDeliveryman" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col lg:flex-row items-center justify-between'>
                            {/* Banner Left Side Content */}
                            <div>
                                {/* <img src={tinyDeliveryman} className='mb-4' alt="Deliveryman" /> */}
                                <h1 className='text-blue-10 text-[34px] lg:text-[48px] 2xl:text-[56px] font-extrabold lg:max-w-[500px] 2xl:max-w-[400px] leading-[1.2] mb-4'>Fastest <span className='text-theme-primary'>Delivery</span> & Easy <span className='text-theme-primary'>Pickup</span></h1>
                                <p className='max-w-[629px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                                <div className='mt-8 flex flex-col md:flex-row items-start md:items-center gap-4'>
                                    <div className='flex items-center'>
                                        <Link to='/' className='button button-fill button-rounded-full'>Track Your Parcel</Link>
                                        <Link to='/' className='w-12 h-12 flex justify-center items-center text-2xl rounded-full bg-dark-12 text-theme-primary hover:bg-theme-primary hover:text-dark-12 duration-300'>
                                            <GoArrowUpRight />
                                        </Link>
                                    </div>
                                    <Link to='/' className='button button-outline'>Be A Rider</Link>
                                </div>
                            </div>

                            {/* Banner Right Side Image */}
                            <div className='mt-10 lg:mt-0'>
                                <img src={fastestDelivery} alt="fastestDelivery" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col lg:flex-row items-center justify-between'>
                            {/* Banner Left Side Content */}
                            <div>
                                {/* <img src={tinyDeliveryman} className='mb-4' alt="Deliveryman" /> */}
                                <h1 className='text-blue-10 text-[34px] lg:text-[48px] 2xl:text-[56px] font-extrabold lg:max-w-[500px] 2xl:max-w-[400px] leading-[1.2] mb-4'>Delivery in <span className='text-theme-primary'>30 Minutes</span> at your doorstep</h1>
                                <p className='max-w-[629px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                                <div className='mt-8 flex flex-col md:flex-row items-start md:items-center gap-4'>
                                    <div className='flex items-center'>
                                        <Link to='/' className='button button-fill button-rounded-full'>Track Your Parcel</Link>
                                        <Link to='/' className='w-12 h-12 flex justify-center items-center text-2xl rounded-full bg-dark-12 text-theme-primary hover:bg-theme-primary hover:text-dark-12 duration-300'>
                                            <GoArrowUpRight />
                                        </Link>
                                    </div>
                                    <Link to='/' className='button button-outline'>Be A Rider</Link>
                                </div>
                            </div>

                            {/* Banner Right Side Image */}
                            <div className='mt-10 lg:mt-0'>
                                <img src={deliveryTime} alt="fastestDelivery" />
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Banner;