import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import AppointmentReducer from '../pages/docDashboard/appointment/AppointmentSlice';

export const store = configureStore({
    reducer: {

        [apiSlice.reducerPath]: apiSlice.reducer,
        appointmentCount: AppointmentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});