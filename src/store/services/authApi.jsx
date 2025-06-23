import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../api/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    sendOTP:builder.mutation({
        query:(data) => ({
        url:"/users/send_otp",
        method:"POST",
        body:data
    }),
    invalidatesTags: ["Auth"],
    }),
    verifyOTP:builder.mutation({
        query:(data) => ({
        url:"/users/verify_otp",
        method:"POST",
        body:data
    }),
    invalidatesTags: ["Auth"],
    }),
   userLogout:builder.mutation({
      query:(data)=>({
        url:"/users/logout",
        method:"POST",
        body:data
      }),
      invalidatesTags:["Auth"],
    }),
  }),
});

export const {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useUserLogoutMutation
  } = authApi;
  