import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import DashboardOverview from "../pages/Dashboard/DashboardOverview/DashboardOverview";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },
            {
                path: 'send-parcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'overview',
                Component: DashboardOverview
            },
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            // Rider Only Routes
            {
                path: 'assigned-deliveries',
                element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
            },
            // Admin Only Routes
            {
                path: 'approve-riders',
                element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            },
            {
                path: 'assign-riders',
                element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
            },
            {
                path: 'users-management',
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            }
        ]
    }
]);