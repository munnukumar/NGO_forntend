import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Plans", "Donations", "Analytics"],
  endpoints: (builder) => ({
    // auth
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),

    register: builder.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),

    // plans
    listPlans: builder.query({
      query: () => ({ url: "/plans", method: "GET" }),
      providesTags: ["Plans"],
    }),

    getPlan: builder.query({
      query: (id: string) => ({ url: `/plans/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Plans", id }],
    }),

    // admin create plan
    createPlan: builder.mutation({
      query: (body) => ({ url: "/plans", method: "POST", body }),
      invalidatesTags: ["Plans"],
    }),

    // donations: subscribe
    subscribe: builder.mutation({
      query: ({ planId, amountCents }: { planId: string; amountCents: number }) => ({
        url: `/donations/${planId}/subscribe`,
        method: "POST",
        body: { amountCents },
      }),
      invalidatesTags: ["Donations", "Plans"],
    }),

    // user endpoints
    me: builder.query({
      query: () => ({ url: "/users/me", method: "GET" }),
      providesTags: ["Donations"],
    }),

    listOfDonationUser: builder.query({
      query: () => ({ url: "/donations", method: "GET" }),
      providesTags: ["Donations"],
    }),

    // NEW: fetch donations for single user (non-admin)
    listOfDonationByUserId: builder.query({
      query: () => ({ url: `/donations/user`, method: "GET" }),
      providesTags: ["Donations"],
    }),

    addPaymentAccount: builder.mutation({
      query: (body) => ({ url: "/users/payment-account", method: "POST", body }),
      invalidatesTags: ["Donations", "Plans"],
    }),

    // analytics
    publicAnalytics: builder.query({
      query: () => ({ url: "/analytics/public", method: "GET" }),
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListPlansQuery,
  useGetPlanQuery,
  useCreatePlanMutation,
  useSubscribeMutation,
  useMeQuery,
  useAddPaymentAccountMutation,
  usePublicAnalyticsQuery,
  useListOfDonationUserQuery,
  useListOfDonationByUserIdQuery, // <- NEW
} = api;
