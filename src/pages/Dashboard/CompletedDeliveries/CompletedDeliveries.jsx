import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`);
            return res.data;
        }
    });

    const calculatePayout = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8;
        }
        else {
            return parcel.cost * 0.6;
        }
    }

    return (
        <div>
            <title>Completed Deliveries - Zap Shift</title>

            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>Completed Deliveries: {parcels.length}</h2>

                <div className="overflow-x-auto border border-dark-3 rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Parcel Name</th>
                                <th>Created At</th>
                                <th>Cost</th>
                                <th>Payout</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loading State */}
                            {isLoading && (
                                <tr>
                                    <td colSpan='7' className='py-8 px-14'>
                                        <div className='text-start md:text-center'><span className="loading loading-bars loading-xl"></span></div>
                                    </td>
                                </tr>
                            )}

                            {
                                parcels.map((parcel, index) => {
                                    return (
                                        <tr key={parcel._id}>
                                            <td>{index + 1}</td>
                                            <td>{parcel.parcleName}</td>
                                            <td>...</td>
                                            <td>{parcel.cost}</td>
                                            <td>{calculatePayout(parcel)}</td>
                                            <td>
                                                <button>Cash out</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompletedDeliveries;