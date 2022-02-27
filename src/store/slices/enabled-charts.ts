import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../"
import { EnabledChartNames } from "../../models/system"

const enabledChartsState = createSlice({
  name: "enabledChartsState",
  initialState: {} as EnabledChartNames,
  reducers: {
    setCharts: (state, action: PayloadAction<EnabledChartNames>) => {
      return (state = action.payload)
    },
    toggleChart: (state, action: PayloadAction<string>) => {
      const name = action.payload
      const currentValue = state[name]
      state[name] = !currentValue
    },
  },
})

export const { setCharts, toggleChart } = enabledChartsState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectEnabledCharts = (state: RootState): EnabledChartNames =>
  state.enabledChartsState

export default enabledChartsState.reducer
