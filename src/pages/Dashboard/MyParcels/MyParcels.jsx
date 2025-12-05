import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { GoCreditCard } from 'react-icons/go';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    // Handle Parcle Delete
    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    // Hnadle Payment
    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            parcleName: parcel.parcleName,
            senderEmail: parcel.senderEmail,
            trackingId: parcel.trackingId
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        window.location.assign(res.data.url);
    }

    if (isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    return (
        <div>
            <title>My Parcels - Zap Shift</title>
            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>My Parcels: {parcels.length}</h2>
                <div className="overflow-x-auto border border-dark-3 rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Parcel Name</th>
                                <th>Recipient Info</th>
                                <th>Cost</th>
                                <th>Payment</th>
                                <th>Tracking ID</th>
                                <th>Delivery Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcle, index) => {
                                    return (
                                        <tr key={parcle._id}>
                                            <td>{index + 1}</td>
                                            <td>{parcle.parcleName}</td>
                                            <td>
                                                <p className='mb-4'>{parcle.recevierName}</p>
                                                <p className='mb-2'>{parcle.receiverRegion}, {parcle.receiverRegion}</p>
                                                <p className='w-[200px] md:w-[250px] lg:max-w-60 mb-2'>{parcle.recevierAddress}</p>
                                                <p>{parcle.recevierNumber}</p>
                                            </td>
                                            <td><p className='w-20'>$ {parcle.cost}</p></td>
                                            <td>
                                                {
                                                    parcle.paymentStatus === 'paid' ?
                                                        <span className='text-sm text-green-700 bg-green-200 py-1.5 px-3 rounded-sm flex items-center gap-1.5 w-fit'><IoCheckmarkDoneOutline className='text-lg' /> Paid</span>
                                                        :
                                                        <button
                                                            onClick={() => handlePayment(parcle)}
                                                            className='flex items-center gap-1.5 text-sm text-amber-600 bg-amber-50 border border-amber-200 py-1.5 px-3 rounded-sm cursor-pointer hover:bg-amber-200 duration-300'><GoCreditCard /> Pay</button>
                                                }
                                            </td>
                                            <td>
                                                <p className='w-[] lg:w-auto'>
                                                    <Link to={`/parcel-track/${parcle.trackingId}`}>{parcle.trackingId}</Link>
                                                </p>
                                            </td>
                                            <td>
                                                <p className='w-[100px]'>{parcle.deliveryStatus}</p>
                                            </td>
                                            <td>
                                                <div className='flex flex-col lg:flex-row items-center justify-center gap-2'>
                                                    <button className='text-sm font-medium py-2 px-2 rounded-sm border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white duration-300 cursor-pointer'><FiEdit /></button>
                                                    <button className='text-sm font-medium py-2 px-2 rounded-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-300 cursor-pointer'><FaRegEye /></button>
                                                    <button
                                                        onClick={() => handleParcelDelete(parcle._id)}
                                                        className='text-sm font-medium py-2 px-2 rounded-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 cursor-pointer'><FaRegTrashAlt /></button>
                                                </div>
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

export default MyParcels;