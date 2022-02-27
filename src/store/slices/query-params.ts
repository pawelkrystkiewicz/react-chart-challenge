import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { DrawFunctionQueryParams } from "../../models/server"

const initialState: DrawFunctionQueryParams = {
  from: 2,
  to: 2,
  step: 0.1,
}

interface ParamsUpdateArgs {
  target: keyof DrawFunctionQueryParams
  value: number
}

const queryParamsState = createSlice({
  name: "queryParamsState",
  initialState,
  reducers: {
    setQueryParam: (state, action: PayloadAction<ParamsUpdateArgs>) => {
      const { target, value } = action.payload
      state[target] = value
    },
  },
})

export const { setQueryParam } = queryParamsState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectQueryParams = (state: RootState): DrawFunctionQueryParams =>
  state.queryParamsState

export default queryParamsState.reducer
