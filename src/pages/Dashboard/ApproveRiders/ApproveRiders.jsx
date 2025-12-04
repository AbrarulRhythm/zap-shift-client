import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';
import { FaRegClock, FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import { LuUserCheck, LuUserX } from 'react-icons/lu';
import Swal from 'sweetalert2';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { MdOutlineCheck, MdOutlineClose } from 'react-icons/md';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    // Update Rider Status
    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email };

        Swal.fire({
            title: "Are you sure?",
            text: "You went to approved this rider!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approved it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Rider status is set to ${status}.`,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        });
    }

    // Handle Rider Approval
    const handleApproval = (rider) => {
        updateRiderStatus(rider, 'approved');
    }

    // Handle Rider Rejection
    const handleRejection = (rider) => {
        updateRiderStatus(rider, 'rejected');
    }

    if (isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    return (
        <div>
            <title>Approve Riders - Zap Shift</title>

            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>Riders Pending Approvel: {riders.length}</h2>

                <div className="overflow-x-auto border border-dark-3 rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Application Status</th>
                                <th>Work Status</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                riders.map((rider, index) => {
                                    return (
                                        <tr key={rider._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p className='w-[100px] lg:w-auto'>{rider.name}</p>
                                            </td>
                                            <td>{rider.email}</td>
                                            <td>
                                                <span className={`${rider.status === 'approved' ?
                                                    'bg-green-200 text-green-700 border-green-500' :
                                                    rider.status === 'rejected' ? 'bg-red-100 text-red-600 border-red-400' :
                                                        'bg-amber-100 text-amber-600 border-amber-400'} border text-[12px] font-medium py-px px-2 rounded-sm flex items-center w-fit gap-1`}>
                                                    {rider.status.toUpperCase()} {rider.status === 'approved' ?
                                                        <MdOutlineCheck className='text-sm' /> :
                                                        rider.status === 'rejected' ?
                                                            <MdOutlineClose /> :
                                                            <FaRegClock />}
                                                </span>
                                            </td>
                                            <td>
                                                {rider.workStatus ? rider.workStatus : 'xxx'}
                                            </td>
                                            <td>
                                                <p className='w-[100px] lg:w-auto'>{moment(rider.createdAt).format('ll')}</p>
                                                <p className='w-[100px] lg:w-auto'>{moment(rider.createdAt).format('LTS')}</p>
                                            </td>
                                            <td>
                                                <div className='flex items-center gap-2'>
                                                    <button data-tip="View" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-300 cursor-pointer'><FaRegEye /></button>
                                                    <button
                                                        onClick={() => { handleApproval(rider) }}
                                                        data-tip="Accept" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300 cursor-pointer'><LuUserCheck /></button>
                                                    <button
                                                        onClick={() => { handleRejection(rider) }}
                                                        data-tip="Reject" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white duration-300 cursor-pointer'><LuUserX /></button>
                                                    <button data-tip="Delete" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 cursor-pointer'><FaRegTrashAlt /></button>
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

export default ApproveRiders;