import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const RiderRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    if (role !== 'rider') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default RiderRoute;