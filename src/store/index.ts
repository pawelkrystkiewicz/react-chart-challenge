import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { drawFunctionAPI } from './services/chart-data-api'

export const store = configureStore({
  reducer: {
    [drawFunctionAPI.reducerPath]: drawFunctionAPI.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(drawFunctionAPI.middleware),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
