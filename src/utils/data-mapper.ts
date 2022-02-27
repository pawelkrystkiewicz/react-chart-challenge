import { ChartDataPoint } from "../models/chart"
import { DataSets } from "../models/server"
import { EnabledChartNames } from "../models/system"

export interface DataMapperResult {
  chartData: ChartDataPoint[]
  enabledCharts: EnabledChartNames
}

export const dataMapper = (data: DataSets): DataMapperResult => {
  if (!data || !data.length) {
    return { chartData: [], enabledCharts: {} }
  }
  // x is common in API so we can just take it from first chart
  // also assuming there is always response
  let chartData = data[0].x.map(value => ({ x: value }))

  data.forEach(entry => {
    chartData = entry.y.map((value, idx) => ({
      [entry.name]: value,
      ...chartData[idx],
    }))
  })

  //now we need to get names of charts
  const names = Object.keys(chartData[0]).filter(name => name !== "x")

  //and set all as enabled ({[name]:true}) - this will be our initial state
  let enabledCharts: EnabledChartNames = {}
  names.forEach((name: string) => {
    enabledCharts[name] = true
  })

  return { chartData, enabledCharts }
}
