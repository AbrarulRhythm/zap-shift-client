import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SocialLogin = ({ text }) => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Hnadle Google Sign In
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                toast.success(`Welcome aboard, ${user.displayName}! 🎉 You've successfully signed up`);
                navigate(location?.state || '/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <>
            <div className='my-6 overflow-hidden'>
                <div className='relative font-medium text-center or-social'>OR</div>
            </div>
            {/* Google Sign In Button */}
            <button onClick={handleGoogleSignIn} className='font-semibold flex items-center justify-center w-full gap-2.5 border border-[#CBD5E1] hover:border-theme-primary duration-200 cursor-pointer rounded-sm py-3'>
                <FcGoogle className='text-[26px]' /> {text}
            </button>
        </>
    );
};

export default SocialLogin;