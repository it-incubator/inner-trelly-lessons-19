import { baseApi } from "@/app/baseApi.ts"
import { REFRESH_TOKEN } from "@/common/constants"
import type { LoginInputs } from "@/features/auth/lib/schemas"
import type { LoginResponse, MeResponse } from "./authApi.types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginInputs>({
      query: (body) => ({
        method: "post",
        url: "auth/simple/login",
        body: { ...body, accessTokenTTL: body.rememberMe ? "3d" : "30m" },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: "post",
        url: "auth/simple/logout",
        body: { refreshToken: localStorage.getItem(REFRESH_TOKEN) },
      }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => "auth/me",
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
