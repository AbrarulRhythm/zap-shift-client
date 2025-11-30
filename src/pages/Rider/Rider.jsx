import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import agentPending from '../../assets/agent-pending.png'
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const Rider = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const riderRegion = useWatch({ control, name: 'region' });

    // Districts By Regions
    const districtsByRegions = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    // Handle be a rider
    const handleBeARider = (data) => {
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    reset(); // form reset

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your application has been submitted. We will reach out to you in 40 days.",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    return (
        <section className='send-parcle'>
            <title>Be A Rider - Zap Shift</title>

            <div className='container'>
                <div className='bg-white rounded-4xl py-10 lg:py-20 px-10 lg:px-20'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-10 mb-3 md:mb-4 lg:mb-6'>Be a Rider</h1>
                    <p className='text-base max-w-[629px]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                    <hr className='border-0 border-t border-black/10 my-6 lg:my-8' />
                    <h2 className='text-2xl md:text-[28px] font-extrabold text-blue-10 mb-3 md:mb-4 lg:mb-6'>Tell us about yourself</h2>

                    <div className='flex flex-wrap -mx-3'>
                        <div className='w-full md:w-6/12 px-3'>
                            <form onSubmit={handleSubmit(handleBeARider)}>
                                {/* Name */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Your Name</label>
                                    <input {...register('name', {
                                        required: 'Name is required'
                                    })} defaultValue={user?.displayName} type="text" className={`${errors.name ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Your Name' />
                                    <span className={`${errors.name ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.name && errors.name.message}</span>
                                </div>
                                {/* Driving License Number */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Driving License Number</label>
                                    <input {...register('drivingLicenseNumber', {
                                        required: 'Driving License Number is required'
                                    })} type="text" className={`${errors.drivingLicenseNumber ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Driving License Number' />
                                    <span className={`${errors.drivingLicenseNumber ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.drivingLicenseNumber && errors.drivingLicenseNumber.message}</span>
                                </div>
                                {/* Your Email */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Your Email</label>
                                    <input {...register('email', {
                                        required: 'Email is required'
                                    })} defaultValue={user?.email} type="email" className={`${errors.email ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Your Email' />
                                    <span className={`${errors.email ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.email && errors.email.message}</span>
                                </div>
                                {/* Your Region */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Your Region</label>
                                    <select {...register('region', {
                                        required: 'please select your Region'
                                    })} defaultValue="" className={`${errors.region ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                        <option value="" disabled>Select your Region</option>
                                        {
                                            regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                        }
                                    </select>
                                    <span className={`${errors.region ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.region && errors.region.message}</span>
                                </div>
                                {/* Your District */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Your District</label>
                                    <select {...register('district', {
                                        required: 'please select your District'
                                    })} defaultValue="" className={`${errors.district ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                        <option value="" disabled>Select your District</option>
                                        {
                                            districtsByRegions(riderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                        }
                                    </select>
                                    <span className={`${errors.district ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.district && errors.district.message}</span>
                                </div>
                                {/* NID No */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>NID No</label>
                                    <input {...register('nidNo', {
                                        required: 'NID is required'
                                    })} type="number" className={`${errors.nidNo ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='NID No' />
                                    <span className={`${errors.nidNo ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.nidNo && errors.nidNo.message}</span>
                                </div>
                                {/* Phone Number */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Phone Number</label>
                                    <input {...register('phoneNumber', {
                                        required: 'Phone Number is required'
                                    })} type="number" className={`${errors.phoneNumber ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Phone Number' />
                                    <span className={`${errors.phoneNumber ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.phoneNumber && errors.phoneNumber.message}</span>
                                </div>
                                {/* Bike Brand Model and Year */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Bike Brand Model and Year</label>
                                    <input {...register('bikeBrandModelYear', {
                                        required: 'Bike Brand Model and Year is required'
                                    })} type="text" className={`${errors.bikeBrandModelYear ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Bike Brand Model and Year' />
                                    <span className={`${errors.bikeBrandModelYear ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.bikeBrandModelYear && errors.bikeBrandModelYear.message}</span>
                                </div>
                                {/* Bike Registration Number */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Bike Registration Number</label>
                                    <input {...register('bikeRegistationNumber', {
                                        required: 'Bike Registration Number is required'
                                    })} type="text" className={`${errors.bikeRegistationNumber ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Bike Registration Number' />
                                    <span className={`${errors.bikeRegistationNumber ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.bikeRegistationNumber && errors.bikeRegistationNumber.message}</span>
                                </div>
                                {/* Tell Us About Yourself */}
                                <div className='mb-4'>
                                    <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Tell Us About Yourself</label>
                                    <textarea {...register('tellAboutYourself', {
                                        required: 'This field is required'
                                    })} rows='3' className={`${errors.tellAboutYourself ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Tell Us About Yourself'></textarea>
                                    <span className={`${errors.tellAboutYourself ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.tellAboutYourself && errors.tellAboutYourself.message}</span>
                                </div>
                                <button className='button button-fill login-re-button w-full'>Apply as a Rider</button>
                            </form>
                        </div>
                        <div className='w-full md:w-6/12 px-3'>
                            <div className='flex justify-end sticky top-2.5'>
                                <img src={agentPending} alt='rider image' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rider;