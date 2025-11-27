import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
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
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    // Parcel created time
    const currentDate = new Date();
    // formate date only
    const formatedDate = currentDate.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    // formate tile only
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // District by Regions
    const districtsByRegions = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    // Hnadle Price and save data in database
    const handleSendParcle = (data) => {
        const isDocument = data.percleType === 'document';
        const isSameDistrict = data.senderDistict === data.receiverDistict;
        const parcleWeight = parseFloat(data.parcleWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcleWeight < 3) {
                cost = isSameDistrict ? 100 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcleWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;

                cost = minCharge + extraCharge;
            }
        }

        // added parcle extra data
        data.cost = cost; // parcle const
        data.created_at = `${formatedDate} | ${formattedTime}`; // parcle created at

        Swal.fire({
            title: "Agree with the Cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Save the parcle info to the database
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        if (res.data.insertedId) {
                            reset();  // Reset Form

                            Swal.fire({
                                title: "Success!",
                                text: "Parcel added successfully.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    return (
        <section className='send-parcle'>
            <div className='container'>
                <div className='bg-white rounded-4xl py-10 lg:py-20 px-10 lg:px-20'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-10 mb-3 md:mb-4 lg:mb-6'>Send A Parcel</h1>
                    <h3 className='text-base md:text-xl lg:text-2xl font-semibold lg:font-bold text-blue-10'>Enter your parcel details</h3>
                    <hr className='border-0 border-t border-black/10 my-6 lg:my-8' />

                    <form onSubmit={handleSubmit(handleSendParcle)}>
                        <div className='flex flex-wrap -mx-3 lg:-mx-6'>
                            {/* Percle Type */}
                            <div className='w-full px-3 lg:px-6 mb-7'>
                                <div className='flex items-center gap-8'>
                                    <label className='flex items-center gap-2 font-medium'>
                                        <input {...register('percleType')} type="radio" value="document" className="radio radio-sm" defaultChecked /> Document
                                    </label>
                                    <label className='flex items-center gap-2 font-medium'>
                                        <input {...register('percleType')} type="radio" value="non-document" className="radio radio-sm" /> Non-Document
                                    </label>
                                </div>
                            </div>
                            {/* Parcel Name */}
                            <div className='w-full md:w-6/12 px-3 lg:px-6 mb-6'>
                                <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Parcel Name</label>
                                <input {...register('parcleName', {
                                    required: 'Parcle name is required'
                                })} type="text" className={`${errors.parcleName ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Parcel Name' />
                                <span className={`${errors.parcleName ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.parcleName && errors.parcleName.message}</span>
                            </div>
                            {/* Parcel Weight */}
                            <div className='w-full md:w-6/12 px-3 lg:px-6 mb-6'>
                                <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Parcel Weight (KG)</label>
                                <input {...register('parcleWeight', {
                                    required: 'Parcle weight is required'
                                })} type="text" className={`${errors.parcleWeight ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Parcel Weight (KG)' />
                                <span className={`${errors.parcleWeight ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.parcleWeight && errors.parcleWeight.message}</span>
                            </div>
                        </div>
                        <hr className='border-0 border-t border-black/10 mt-2 mb-8' />
                        <div className='flex flex-wrap -mx-3 lg:-mx-6'>
                            {/* Sender Details */}
                            <div className='w-full md:w-6/12 px-3 lg:px-6'>
                                <div className='flex flex-wrap -mx-3'>
                                    <div className='w-full px-3 mb-7'>
                                        <h5 className='text-lg font-extrabold text-blue-10'>Sender Details</h5>
                                    </div>

                                    {/* Sender Name */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Sender Name</label>
                                        <input {...register('senderName', {
                                            required: 'Sender name is required'
                                        })} defaultValue={user?.displayName} type="text" className={`${errors.senderName ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Sender Name' />
                                        <span className={`${errors.senderName ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.senderName && errors.senderName.message}</span>
                                    </div>
                                    {/* Sender Email */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Sender Email</label>
                                        <input {...register('senderEmail', {
                                            required: 'Sender email is required'
                                        })} defaultValue={user?.email} type="email" className={`${errors.senderEmail ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Sender Email' />
                                        <span className={`${errors.senderEmail ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.senderEmail && errors.senderEmail.message}</span>
                                    </div>
                                    {/* Sender Pickup Wire house */}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Sender Pickup Wire house</label>
                                        <select {...register('senderWireHouse', {
                                            required: 'please select sender wire house'
                                        })} defaultValue="" className={`${errors.senderWireHouse ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                            <option value="" disabled>Select Wire house</option>
                                            <option>Crimson</option>
                                            <option>Amber</option>
                                            <option>Velvet</option>
                                        </select>
                                        <span className={`${errors.senderWireHouse ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.senderWireHouse && errors.senderWireHouse.message}</span>
                                    </div>
                                    {/* Sender Region */}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Sender Region</label>
                                        <select {...register('senderRegion', {
                                            required: 'please select your region'
                                        })} defaultValue="" className={`${errors.senderRegion ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                            <option value="" disabled>Select your region</option>
                                            {
                                                regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                            }
                                        </select>
                                        <span className={`${errors.senderRegion ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.senderRegion && errors.senderRegion.message}</span>
                                    </div>
                                    {/* Address */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Address</label>
                                        <input {...register('senderAddress', {
                                            required: 'Sender address is required'
                                        })} type="text" className={`${errors.senderAddress ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Address' />
                                        <span className={`${errors.senderAddress ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.senderAddress && errors.senderAddress.message}</span>
                                    </div>
                                    {/* Sender Distict */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Sender Disticts</label>
                                        <select {...register('senderDistict', {
                                            required: 'Sender disticts is required'
                                        })} defaultValue="" className={`${errors.senderDistict ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                            <option value="" disabled>Select your disticts</option>
                                            {
                                                districtsByRegions(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                            }
                                        </select>
                                        <span className={`${errors.senderDistict ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.senderDistict && errors.senderDistict.message}</span>
                                    </div>
                                    {/* Sender Contact No */}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Sender Contact No</label>
                                        <input {...register('senderNumber', {
                                            required: 'Sender number is required'
                                        })} type="number" className={`${errors.senderNumber ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Sender Contact No' />
                                        <span className={`${errors.senderNumber ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.senderNumber && errors.senderNumber.message}</span>
                                    </div>
                                    {/* Pickup Instruction */}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Pickup Instruction</label>
                                        <textarea {...register('pickupInstruction')} className='form-field form-field-border' rows='4' placeholder='Pickup Instruction'></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Receiver Details */}
                            <div className='w-full md:w-6/12 px-3 lg:px-6'>
                                <div className='flex flex-wrap -mx-3'>
                                    <div className='w-full px-3 mb-7'>
                                        <h5 className='text-lg font-extrabold text-blue-10'>Receiver Details</h5>
                                    </div>

                                    {/* Receiver Name */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Receiver Name</label>
                                        <input {...register('recevierName', {
                                            required: 'Sender name is required'
                                        })} type="text" className={`${errors.recevierName ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Receiver Name' />
                                        <span className={`${errors.recevierName ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.recevierName && errors.recevierName.message}</span>
                                    </div>
                                    {/* Receiver Email */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Receiver Email</label>
                                        <input {...register('recevierEmail', {
                                            required: 'Receiver email is required'
                                        })} type="email" className={`${errors.recevierEmail ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Receiver Email' />
                                        <span className={`${errors.recevierEmail ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.recevierEmail && errors.recevierEmail.message}</span>
                                    </div>
                                    {/* Receiver Delivery Wire house */}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Receiver Delivery Wire house</label>
                                        <select {...register('receiverWireHouse', {
                                            required: 'Please select receiver wire house'
                                        })} defaultValue="" className={`${errors.receiverWireHouse ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                            <option value="" disabled>Select Wire house</option>
                                            <option>Crimson</option>
                                            <option>Amber</option>
                                            <option>Velvet</option>
                                        </select>
                                        <span className={`${errors.receiverWireHouse ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.receiverWireHouse && errors.receiverWireHouse.message}</span>
                                    </div>
                                    {/* Receiver Region */}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Receiver Region</label>
                                        <select {...register('receiverRegion', {
                                            required: 'Please select your region'
                                        })} defaultValue="" className={`${errors.receiverRegion ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                            <option value="" disabled>Select your region</option>
                                            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                        </select>
                                        <span className={`${errors.receiverRegion ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.receiverRegion && errors.receiverRegion.message}</span>
                                    </div>
                                    {/* Receiver Address */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Receiver Address</label>
                                        <input {...register('recevierAddress', {
                                            required: 'Receiver address is required'
                                        })} type="text" className={`${errors.recevierAddress ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Address' />
                                        <span className={`${errors.recevierAddress ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.recevierAddress && errors.recevierAddress.message}</span>
                                    </div>
                                    {/* Receiver Distict */}
                                    <div className='w-full lg:w-6/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Receiver Distict</label>
                                        <select {...register('receiverDistict', {
                                            required: 'Please select your district'
                                        })} defaultValue="" className={`${errors.receiverDistict ? 'form-field-error' : 'form-field-border'} form-field select h-[50px] focus:outline-0`}>
                                            <option value="" disabled>Select your district</option>
                                            {districtsByRegions(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                                        </select>
                                        <span className={`${errors.receiverDistict ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.receiverDistict && errors.receiverDistict.message}</span>
                                    </div>
                                    {/* Receiver Contact No*/}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Receiver Contact No</label>
                                        <input {...register('recevierNumber', {
                                            required: 'Receiver number is required'
                                        })} type="number" className={`${errors.recevierNumber ? 'form-field-error' : 'form-field-border'} form-field`} placeholder='Receiver Contact No' />
                                        <span className={`${errors.recevierNumber ? 'block mt-1' : 'hidden'} text-sm text-red-500`}>{errors.recevierNumber && errors.recevierNumber.message}</span>
                                    </div>
                                    {/* Delivery Instruction */}
                                    <div className='w-full lg:w-12/12 px-3 mb-5'>
                                        <label className='block text-sm text-dark-10 mb-1.5 font-medium'>Delivery Instruction</label>
                                        <textarea {...register('deliveryInstruction')} className='form-field form-field-border' rows='4' placeholder='Delivery Instruction'></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className='font-medium mt-0 lg:mt-4'>* PickUp Time 4pm-7pm Approx.</p>
                        <button className='button button-fill mt-6 lg:mt-8 login-re-button w-full md:w-auto'>Proceed to Confirm Booking</button>
                    </form>
                </div>
            </div >
        </section >
    );
};

export default SendParcel;