import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`);
            return res.data;
        }
    });

    console.log(parcels);

    return (
        <div>
            <title>Assigned Deliveries - Zap Shift</title>

            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>Parcels Pending Pickup: {parcels.length}</h2>

                <div className="overflow-x-auto border border-dark-3 rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Parcel Name</th>
                                <th>Confirm</th>
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
                                            <td>
                                                <button className='py-2 px-4 text-sm font-semibold text-blue-600 border border-blue-600 rounded-sm'>Accept</button>
                                                <button className='py-2 px-4 text-sm font-semibold text-red-600 border border-red-600 rounded-sm'>Accept</button>
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

export default AssignedDeliveries;