// components/Snackbar.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Snackbar = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (isVisible) {
    //         const timeout = setTimeout(() => {
    //             dispatch({ type: 'HIDE_SNACKBAR' });
    //         }, 3000); // Mostrar durante 3 segundos
    //         return () => clearTimeout(timeout);
    //     }
    // }, [isVisible, dispatch]);

    return (
        // <div className={`fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded ${isVisible ? 'block' : 'hidden'}`}>
        <div className={`fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded`}>
            Message
        </div>
    );
};

export default Snackbar;
