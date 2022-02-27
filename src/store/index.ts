import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { drawFunctionAPI } from "./services/chart-data-api"
import enabledChartsState from "./slices/enabled-charts"
import queryParamsState from "./slices/query-params"

export const store = configureStore({
  reducer: {
    [drawFunctionAPI.reducerPath]: drawFunctionAPI.reducer,
    enabledChartsState,
    queryParamsState,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(drawFunctionAPI.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
