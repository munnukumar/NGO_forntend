import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../store/store";
import { setCredentials, clearCredentials } from "../store/reducers/authReducer";

const baseUrl = import.meta.env.VITE_API_BASE || "/api";

// Shape of refresh token response from backend (Redis)
interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    role: "USER" | "ADMIN" | null;
  } | null;
}

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

  // Initial request
  let result = await baseQuery(args, api, extraOptions);

  // If 401 or fetch error, try to refresh token
  if (
    result.error &&
    (result.error.status === 401 || (result.error as FetchBaseQueryError)?.status === "FETCH_ERROR")
  ) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(clearCredentials());
      return result;
    }

    // Request new tokens from backend (Redis handles refresh)
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST", body: { refreshToken } },
      api,
      extraOptions
    ) as { data?: RefreshResponse };

    if (refreshResult.data) {
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.accessToken,
          refreshToken: refreshResult.data.refreshToken,
          user: refreshResult.data.user ?? (api.getState() as RootState).auth.user ?? null,
        })
      );

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};
