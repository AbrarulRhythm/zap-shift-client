import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    return (
        <div>
            <title>Payment History - Zap Shift</title>

            <div className='bg-white p-8 rounded-2xl'>
                <h2 className='text-3xl md:text-[40px] lg:text-5xl font-extrabold text-blue-10 mb-8 md:mb-10'>Payment History: {payments.length}</h2>
                <div className="overflow-x-auto border border-dark-3 rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Parcel Name</th>
                                <th>Tracking ID</th>
                                <th>Transaction ID</th>
                                <th>Payment Info</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) => {
                                    return (
                                        <tr key={payment._id}>
                                            <td>{index + 1}</td>
                                            <td>{payment.parcleName}</td>
                                            <td>{payment.trackingId}</td>
                                            <td>{payment.transactionId}</td>
                                            <td>
                                                <span className='inline-block py-1.5 px-3 rounded-sm bg-green-200 border border-green-300 text-green-700 text-sm leading-[normal]'>${payment.amount} {payment.paymentStatus.toUpperCase()}</span>
                                            </td>
                                            <td>
                                                <button className='font-semibold py-1.5 px-4 rounded-md bg-blue-100 text-blue-600 border border-blue-300 hover:bg-blue-600 hover:text-white duration-300 cursor-pointer text-sm'>View</button>
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

export default PaymentHistory;