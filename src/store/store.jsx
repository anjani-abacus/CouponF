import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import { authApi } from "./services/authApi";
import { productApi } from "./services/productApi";
import { couponApi } from "./services/coupon";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [couponApi.reducerPath]:couponApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      
      authApi.middleware,
      productApi.middleware,
      couponApi.middleware

    ]),
});

export default store;





