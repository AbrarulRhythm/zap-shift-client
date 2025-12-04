import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment/moment';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef()

    const { isLoading, data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    });

    // Handle Open Rider Modal
    const openAssignRiderModal = (parcel) => {
        riderModalRef.current.showModal();
    }

    return (
        <div>
            <title>Assign Riders - Zap Shift</title>

            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>Assign Riders: {parcels.length}</h2>

                <div className="overflow-x-auto border border-dark-3 rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Parcel Name</th>
                                <th>Cost</th>
                                <th>Pickup Location</th>
                                <th>Created At</th>
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
                                            <td>
                                                <p>{parcel.parcleName}</p>
                                            </td>
                                            <td><p className='w-20'>$ {parcel.cost}</p></td>
                                            <td>
                                                <p className='mb-4 font-semibold'>{parcel.senderName}</p>
                                                <p className='mb-2'>{parcel.senderRegion}, {parcel.senderDistict}</p>
                                                <p className='w-[200px] md:w-[250px] lg:max-w-60 mb-2'>{parcel.senderAddress}</p>
                                                <p>{parcel.recevierNumber}</p>
                                            </td>
                                            <td>
                                                <p className='w-[100px] lg:w-auto'>{moment(parcel.createdAt).format('ll')}</p>
                                                <p className='w-[100px] lg:w-auto'>{moment(parcel.createdAt).format('LTS')}</p>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => openAssignRiderModal(parcel)}
                                                    className='text-sm font-semibold text-nowrap py-2 px-4 rounded-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-300 cursor-pointer'>Assign Rider</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* Assign Rider Modal */}
                <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AssignRiders;