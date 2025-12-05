import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`);
            return res.data;
        }
    });

    // Handle Accept Delivery
    const handleDeliveryStatusUpdate = (parcel, status) => {
        const statusInfo = { deliveryStatus: status };

        let message = `Parcel Status is updated with ${status.split('_').join(' ')}`;

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

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
                                <th>Other Actions</th>
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
                                                {parcel.deliveryStatus === 'driver_assigned' ? <>
                                                    <button
                                                        onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                                                        className='py-2 px-4 text-sm font-semibold text-blue-600 border border-blue-600 rounded-sm cursor-pointer'>Accept</button>
                                                    <button className='py-2 px-4 text-sm font-semibold text-red-600 border border-red-600 rounded-sm'>Reject</button>
                                                </> :
                                                    <span>Accepted</span>
                                                }
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                                                    className='py-2 px-4 text-sm font-semibold text-blue-600 border border-blue-600 rounded-sm cursor-pointer'>Mark as Picked Up</button>
                                                <button
                                                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                                                    className='ms-2 py-2 px-4 text-sm font-semibold text-blue-600 border border-blue-600 rounded-sm cursor-pointer'>Mark as Delivered</button>
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