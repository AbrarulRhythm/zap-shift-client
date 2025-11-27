import React from 'react';
import paymentCanceled from '../../../assets/payment-canceled.png';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='bg-white p-8 rounded-2xl text-center'>
            <title>Payment Canceled - Zap Shift</title>

            <div className='py-10'>
                <img src={paymentCanceled} className='mx-auto mb-6 md:mb-8 w-28 lg:w-auto' alt="payment-successful" />
                <h2 className='text-3xl md:text-4xl font-extrabold text-dark-12 mb-8 lg:mb-10'>Your Payment Has Been Canceled</h2>
                <Link to='/dashboard/my-parcels' className='button button-fill'>Try Again</Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;