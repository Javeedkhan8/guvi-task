import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

/** auth middleware */
import { ProtectRoute, AuthorizeUser } from './middleware/auth';

/** root routes */
const router = createBrowserRouter([
    {
        path: '/',
        element: <Username />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/password',
        element: (
            <ProtectRoute>
                <Password />
            </ProtectRoute>
        )
    },
    {
        path: '/profile',
        element: (
            <AuthorizeUser>
                <Profile />
            </AuthorizeUser>
        )
    },
    {
        path: '/recovery',
        element: <Recovery />
    },
    {
        path: '/reset',
        element: <Reset />
    },
    {
        path: '*',
        element: <PageNotFound />
    }
]);

export default function App() {
    return (
        <main>
            <RouterProvider router={router} />
        </main>
    );
}