import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DrawFunctionQueryParams, DrawFunctionQueryResponse } from '../../models/server'
import SETTINGS from '../../settings'
import { dataMapper, DataMapperResult } from '../../utils/data-mapper'

// Define a service using a base URL and expected endpoints
export const drawFunctionAPI = createApi({
  reducerPath: 'drawFunctionAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SETTINGS.apiUrl }),
  endpoints: builder => ({
    getChartData: builder.query<DataMapperResult, DrawFunctionQueryParams>({
      query: ({ from, to, step }) => `/points?from=${from}&to=${to}&step=${step}`,
      transformResponse: (response: DrawFunctionQueryResponse, meta, arg) => dataMapper(response),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetChartDataQuery } = drawFunctionAPI
