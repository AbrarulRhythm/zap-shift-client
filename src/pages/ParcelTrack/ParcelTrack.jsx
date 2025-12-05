import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { VscCheck } from "react-icons/vsc";
import moment from 'moment/moment';

const ParcelTrack = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();

    const { data: trackings = [] } = useQuery({
        queryKey: ['tracking', trackingId],
        enabled: !!trackingId, // Query only runs if trackingId exists
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
            return res.data;
        }
    });

    return (
        <section className='track-order'>
            <title>Track Order - Zap Shift</title>

            <div className='container'>
                <div className='bg-white rounded-4xl py-10 lg:py-20 px-10 lg:px-20'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-10 mb-3 md:mb-4 lg:mb-6'>Track Your Consignment: {trackings.length}</h1>
                    {trackingId ? <p className='text-lg font-semibold text-dark-8'>Track Your Package: <span className='text-dark-13'>{trackingId}</span></p> : ''}
                    <hr className='border-0 border-t border-black/10 my-6 lg:my-8' />

                    {trackingId &&
                        <>
                            <div className='flex flex-wrap -mx-3'>
                                <div className='w-full lg:w-6/12 px-3'></div>
                                <div className='w-full lg:w-6/12 px-3'>
                                    <div>
                                        <ul className="timeline timeline-vertical">
                                            {
                                                trackings.map(log => {
                                                    return (
                                                        <li key={log._id}>
                                                            <hr className='h-4' />
                                                            <div className="timeline-start">
                                                                <div className='flex flex-col items-start min-w-[120px] font-medium text-sm'>
                                                                    <p>{moment(log.createdAt).format('ll')}</p>
                                                                    <p>{moment(log.createdAt).format('LTS')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="timeline-middle">
                                                                <div className='w-[46px] h-[46px] flex items-center justify-center bg-green-100 text-green-700 rounded-full text-2xl'>
                                                                    <VscCheck />
                                                                </div>
                                                            </div>
                                                            <div className="timeline-end flex min-w-[200px] pl-2 lg:pl-20 font-semibold text-dark-13">{log.details}</div>
                                                            <hr className='h-4' />
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </section>
    );
};

export default ParcelTrack;