import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

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
                                <th>Payment Status</th>
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
                                            <td>৳ {parcle.cost}</td>
                                            <td>...</td>
                                            <td>
                                                <div className='flex flex-col lg:flex-row items-center justify-center gap-2'>
                                                    <button className='text-sm font-medium py-2 px-2 rounded-sm border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white duration-300 cursor-pointer'><FiEdit /></button>
                                                    <button className='text-sm font-medium py-2 px-2 rounded-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-300 cursor-pointer'><FaRegEye /></button>
                                                    <button className='text-sm font-medium py-2 px-2 rounded-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 cursor-pointer'><FaRegTrashAlt /></button>
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