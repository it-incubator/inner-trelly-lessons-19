import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"

export const handleServerError = (error: unknown, dispatch: Dispatch) => {
  let errorMsg = "Something went wrong."
  
  if (isAxiosError(error)) {
    errorMsg = error.response?.data?.errors?.[0]?.detail || error.message
  } else if (error instanceof Error) {
    errorMsg = `Нативная ошибка ${error.message}`
  }
  
  dispatch(setAppErrorAC({ error: errorMsg }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
