import React, { useEffect, useState } from 'react';
import paymentSuccessful from '../../../assets/payment-successful.png';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                    if (res.data.modifyParcel.modifiedCount) {
                        toast.success('Payment Successfully 🎉');
                    }
                });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className='bg-white p-8 rounded-2xl text-center'>
            <title>Payment Completed Successfully - Zap Shift</title>

            <div className='py-10'>
                <img src={paymentSuccessful} className='mx-auto mb-6 md:mb-8 w-28 lg:w-auto' alt="payment-successful" />
                <h2 className='text-3xl md:text-4xl font-extrabold text-dark-12 mb-3'>Payment Completed Successfully</h2>
                <p>Your Transaction ID: {paymentInfo.transactionId}</p>
                <p>Your Tracking ID: {paymentInfo.trackingId}</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;