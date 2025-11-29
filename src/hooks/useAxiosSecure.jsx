import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request Interceptor
        const reqInterceprot = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;
        });

        // Response Interceptor
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error, 'guru randhawa');

            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                signOutUser()
                    .then(() => {
                        navigate('/login');
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Access denied. Please sign in again.",
                        });
                    })
                    .catch(error => {
                        toast.error(error.message);
                    })
            }

            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceprot);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [user, signOutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;