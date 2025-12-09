import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Role = "USER" | "ADMIN" | null;

interface User {
  id: string;
  email: string;
  role: Role;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
 setCredentials: (
  state,
  action: PayloadAction<{
    accessToken: string;
    refreshToken: string;
    user: User | null;
  }>
) => {
  const { accessToken, refreshToken, user } = action.payload;

  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.user = user;

  if (accessToken) localStorage.setItem("accessToken", accessToken);
  else localStorage.removeItem("accessToken");

  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  else localStorage.removeItem("refreshToken");

  if (user) {
    // ✅ Store the full user object
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", user.role ?? "");
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  }
},



    clearCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
