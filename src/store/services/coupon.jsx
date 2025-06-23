import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../api/api";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Coupon"],
  endpoints: (builder) => ({
    

    GetAllCouponsWithQuantity: builder.query({
      query: () => ({
        url: "coupon/coupons_with_quantity",
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
     deleteCouponWithQuantity: builder.mutation({
      query: (id) => ({
        url: `/coupon/delete_coupon_history/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),
    generateCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/create_coupon",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useGetAllCouponsWithQuantityQuery,
  useDeleteCouponWithQuantityMutation,
  useGenerateCouponMutation
} = couponApi;
