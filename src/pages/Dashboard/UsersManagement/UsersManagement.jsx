import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';
import { FaUserShield } from 'react-icons/fa';
import { LuShieldOff } from 'react-icons/lu';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    // Update user role
    const updateUserRole = (user, role) => {
        const roleInfo = { role };

        // Conditional confirmation messages
        const actionText =
            role === "admin"
                ? "You want to approve this rider and make them an Admin!"
                : "You want to remove Admin access from this user!";

        const confirmButtonText =
            role === "admin"
                ? "Yes, approve!"
                : "Yes, remove!";


        Swal.fire({
            title: "Are you sure?",
            text: actionText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            // refresh the data in the ui
                            refetch();

                            const titleMessage = role === 'admin'
                                ? `${user.displayName} marked as an Admin`
                                : `${user.displayName} is no longer an Admin`;

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: titleMessage,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        });
    }

    // Handle Make Admin
    const handleMakeAdmin = (user) => {
        updateUserRole(user, 'admin');
    }

    // Handle Remove Admin
    const handleRemoveAdmin = (user) => {
        updateUserRole(user, 'user');
    }

    if (isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    return (
        <div>
            <title>Users Management - Zap Shift</title>

            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>Manage Users: {users.length}</h2>

                <div className="overflow-x-auto border border-dark-3 rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created At</th>
                                <th>Admin Action</th>
                                <th>Others Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className='flex items-center gap-2 w-[170px] lg:w-auto'>
                                                    <img src={user.photoURL} className='w-10 h-10 object-cover rounded-full bg-dark-5' alt="Users Profile" />
                                                    <h5 className='text-sm font-semibold text-dark-12'>{user.displayName}</h5>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{user.email}</p>
                                            </td>
                                            <td>{user.role}</td>
                                            <td>
                                                <p className='w-[100px] lg:w-auto'>{moment(user.createdAt).format('ll')}</p>
                                                <p className='w-[100px] lg:w-auto'>{moment(user.createdAt).format('LTS')}</p>
                                            </td>
                                            <td>
                                                <div className='flex items-center gap-2'>
                                                    {user.role === 'admin' ?
                                                        <button
                                                            onClick={() => handleRemoveAdmin(user)}
                                                            data-tip="Admin Remove" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-300 cursor-pointer'><LuShieldOff className='text-lg' /></button>
                                                        :
                                                        <button
                                                            onClick={() => handleMakeAdmin(user)}
                                                            data-tip="Admin Accept" className='tooltip text-sm font-medium py-2 px-2 rounded-sm border border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300 cursor-pointer'><FaUserShield className='text-lg' /></button>
                                                    }
                                                </div>
                                            </td>
                                            <td>...</td>
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

export default UsersManagement;