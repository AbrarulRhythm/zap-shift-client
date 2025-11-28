import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { GoCreditCard } from 'react-icons/go';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    // Handle Payment
    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            parcleName: parcel.parcleName,
            senderEmail: parcel.senderEmail
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    return (
        <div>
            <title>{`Unpaid - ${parcel.parcleName}`}</title>

            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>Please Pay ${parcel.cost} for: <span className='text-theme-primary'>{parcel.parcleName}</span></h2>
                <button
                    onClick={handlePayment}
                    className='flex items-center gap-1.5 text-base font-semibold text-amber-600 bg-amber-50 border border-amber-200 py-3 px-6 rounded-sm cursor-pointer hover:bg-amber-200 duration-300'><GoCreditCard className='text-lg' /> Pay Now</button>
            </div>
        </div>
    );
};

export default Payment;