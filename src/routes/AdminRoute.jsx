import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || !user || isLoading) {
        return <div><span className="loading loading-bars loading-xl"></span></div>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;